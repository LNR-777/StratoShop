@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script, version 3.2.0
@REM
@REM Optional ENV vars
@REM   MVNW_REPO_URL - repo url users can specify to override repo.maven.apache.org
@REM ----------------------------------------------------------------------------

@IF "%DEBUG%" == "on" ECHO ON
@setlocal

set ERROR_CODE=0

@REM To isolate internal variables from possible generic names, use prefix MAVEN_WRAPPER
set "MAVEN_WRAPPER_JAR=%~dp0.mvn\wrapper\maven-wrapper.jar"
set "MAVEN_WRAPPER_PROPERTIES=%~dp0.mvn\wrapper\maven-wrapper.properties"

@REM ----------------------------------------------------------------------------
@REM Find Java 
@REM ----------------------------------------------------------------------------

if not "%JAVA_HOME%" == "" goto OkJava

echo.
echo Error: JAVA_HOME not found in your environment. >&2
echo Please set the JAVA_HOME variable in your environment to match the >&2
echo location of your Java installation. >&2
echo.
set ERROR_CODE=1
goto end

:OkJava
set "JAVACMD=%JAVA_HOME%\bin\java.exe"

if exist "%JAVACMD%" goto checkWrapper

echo.
echo Error: JAVA_HOME is set to an invalid directory. >&2
echo JAVA_HOME = "%JAVA_HOME%" >&2
echo Please set the JAVA_HOME variable in your environment to match the >&2
echo location of your Java installation. >&2
echo.
set ERROR_CODE=1
goto end

:checkWrapper
@REM ----------------------------------------------------------------------------
@REM Check for wrapper jar
@REM ----------------------------------------------------------------------------
if exist "%MAVEN_WRAPPER_JAR%" goto run

@REM ----------------------------------------------------------------------------
@REM Download wrapper jar if not exists
@REM ----------------------------------------------------------------------------
echo Maven Wrapper not found, creating .mvn/wrapper/maven-wrapper.jar ...

@REM set the url
for /f "tokens=2 delims==" %%i in ('findstr "wrapperUrl" "%MAVEN_WRAPPER_PROPERTIES%"') do set "WRAPPER_URL=%%i"

powershell -Command "& { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('%WRAPPER_URL%', '%MAVEN_WRAPPER_JAR%') }"

if not exist "%MAVEN_WRAPPER_JAR%" (
  echo.
  echo Error: Could not download Maven Wrapper jar. >&2
  echo.
  set ERROR_CODE=1
  goto end
)

:run
@REM ----------------------------------------------------------------------------
@REM Run Maven
@REM ----------------------------------------------------------------------------

set "MAVEN_PROJECTBASEDIR=%~dp0"
if "%MAVEN_PROJECTBASEDIR:~-1%"=="\" set "MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%"

"%JAVACMD%" -classpath "%MAVEN_WRAPPER_JAR%" "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" org.apache.maven.wrapper.MavenWrapperMain %*

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
exit /B %ERROR_CODE%
