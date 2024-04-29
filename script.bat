@echo off
setlocal enabledelayedexpansion

set "sourceDirectory=./src/assets/database"
set "csvFile=./src/assets/file.csv"

type nul > "%csvFile%"

for %%f in ("%sourceDirectory%\*.*") do (
    set "fileName=%%~nxf"
    

    echo !fileName! >> "%csvFile%"
)

endlocal