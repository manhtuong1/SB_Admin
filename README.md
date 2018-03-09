# SB_Admin
##Debug chrome vs nodejs

{
  "version": "0.2.0",
  "compounds": [
      {
          "name": "Full-Stack",
          "configurations": ["Launch Program", "Chrome"]
      }
  ],
  "configurations": [

      {
          "name": "Chrome",
          "type": "chrome",
          "request": "launch",
          "url": "http://localhost:3000",
          "port": 9222,
          "userDataDir": "${workspaceFolder}/.vscode/chrome",
          "webRoot": "${workspaceFolder}/public"
      },
      {
          "type": "node",
          "request": "launch",
          "name": "Launch Program",
          "program": "${workspaceFolder}/bin/www"
      }
  ]
}
