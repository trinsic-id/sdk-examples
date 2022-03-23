# Trinsic SDK samples for .NET Maui

Project requires NET 6.0 SDK. To run the application for a specific platform, from the `HauiMaui` folder run:

```
dotnet build -t:Run -f:net6.0-ios
```

Available platforms are `net6.0-ios`, `net6.0-android`, `net6.0-maccatalyst` and `net6.0-windows`

To run the application for specific iOS simulator, you can use the following command:

```
 dotnet build -t:Run -f net6.0-ios -p:_DeviceName=:v2:udid=2E3322FF-297E-48FB-892E-BBD44E21D240
```

Note that you have to replace the `udid` with the device ID available in your system. To get a list of avilable devices, use `xcrun simctl list devices available`