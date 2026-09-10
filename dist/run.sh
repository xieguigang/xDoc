#!/bin/bash

dotnet ./bin/Fluteway.dll /run --app ./bin/Nuget.dll --listen 80 --wwwroot ./wwwroot --data ./data/ --max-post-size 1073741824 --base-url http://nuget.scibasic.net/