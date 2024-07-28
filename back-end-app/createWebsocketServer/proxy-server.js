const treeKill = require("tree-kill")
const { spawn } = require("child_process")

const runProject = (command, projectPath, homeWindow) => {
  const child = spawn(command, {
    cwd: projectPath[0],
    shell: true,
  })
  child.stdout.on("data", (data) => {
    homeWindow.webContents.send("receiveLogs", data)
  })
  child.stderr.on("data", (data) => {
    homeWindow.webContents.send("receiveLogs", data)
  })
  child.on("close", (code) => {
    homeWindow.webContents.send("receiveLogs", error)
    console.log(`Child process exited with code ${code}`)
  })
  child.on("error", (error) => {
    homeWindow.webContents.send("receiveLogs", error)
    console.error(`Error spawning child process: ${error}`)
  })

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Child process exited with code ${code}`)
    }
  })
  return child
}

const stopProject = (child) => {
  if (child && child.pid) {
    treeKill(child.pid, "SIGTERM", (err) => {
      if (err) {
        console.error(`Error killing child process: ${err}`)
      } else {
        console.log(`Killed child process with PID ${child.pid}`)
      }
    })
  } else {
    console.error("No child process to kill")
  }
}

module.exports = { runProject, stopProject }
