// Terminal.js
import 'xterm/css/xterm.css'
import { Box, Button, Stack } from '@mui/material'
import { useEffect, useRef } from 'react'
import { FitAddon } from 'xterm-addon-fit'
import { Terminal } from 'xterm'

const TerminalComponent = () => {
    const terminalRef = useRef(null)
    const xtermRef = useRef(null)
    const fitAddonRef = useRef(null)

    useEffect(() => {
        xtermRef.current = new Terminal({
            disableStdin: true, // Disable input
        })
        fitAddonRef.current = new FitAddon()
        xtermRef.current.loadAddon(fitAddonRef.current)
        xtermRef.current.open(terminalRef.current)
        fitAddonRef.current.fit()

        // Handle resizing
        window.addEventListener('resize', () => {
            fitAddonRef.current.fit()
        })

        window.ipcRenderer.receiveLogs((logs) => xtermRef.current.writeln(logs))
        // Clean up
        return () => {
            xtermRef.current.dispose()
            window.removeEventListener('resize', () => {
                fitAddonRef.current.fit()
            })
        }
    }, [])

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Stack spacing={2} direction='row' sx={{ marginBottom: 2 }}>
                <Button
                    variant='contained'
                    onClick={() => xtermRef.current.clear()}
                >
                    Clear Terminal
                </Button>
                {/* Add more MUI components as needed */}
            </Stack>
            <div
                ref={terminalRef}
                style={{ height: 'calc(100% - 56px)', width: '100%' }}
            ></div>
        </Box>
    )
}

export default TerminalComponent
