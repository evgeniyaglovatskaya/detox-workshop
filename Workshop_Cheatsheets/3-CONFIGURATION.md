# Configuration

## Update Detox configuration file

Add debug and release apps configuration for both platforms. 

```json
{
  "testRunner": "jest",
  "runnerConfig": "e2e/config.json",
  "skipLegacyWorkersInjection": true,
  "apps": {
    "ios.release": {
      "type": "ios.app",
      "binaryPath": "ios/build/Build/Products/Release-iphonesimulator/DetoxWorkshop.app",
      "build": "xcodebuild -workspace ios/DetoxWorkshop.xcworkspace -configuration release -scheme DetoxWorkshop -sdk iphonesimulator -derivedDataPath ios/build"
    },
    "ios.debug": {
      "type": "ios.app",
      "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/DetoxWorkshop.app",
      "build": "xcodebuild -workspace ios/DetoxWorkshop.xcworkspace -scheme DetoxWorkshop -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build"
    },
    "android.debug": {
      "type": "android.apk",
      "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
      "build": "cd android ; ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug ; cd -"
    },
    "android.release": {
      "type": "android.apk",
      "binaryPath": "android/app/build/outputs/apk/release/app-release.apk",
      "build": "cd android ; ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release ; cd -"
    }
  },
  "devices": {
    "simulator": {
      "type": "ios.simulator",
      "device": {
        "type": "iPhone 12"
      }
    },
    "emulator": {
      "type": "android.emulator",
      "device": {
        "avdName": "Pixel_5_API_30"
      }
    }
  },
  "configurations": {
    "ios.sim.release": {
      "device": "simulator",
      "app": "ios.release"
    },
    "ios.sim.debug": {
      "device": "simulator",
      "app": "ios.debug"
    },
    "android.emu.debug": {
      "device": "emulator",
      "app": "android.debug"
    },
    "android.emu.release": {
      "device": "emulator",
      "app": "android.release"
    }
  }
}
```

Remember to update: 
- name of your project for iOS build and binary path
- iOS and Android simulators you have on your machine

## Configure Android project

### **1. Update build.gradle in your root android folder**

Add Kotlin in ext and the Kotlin Gradle-plugin to your classpath. To check latest version - Android Studio > Preferences > Languages & Frameworks > Kotlin.

```groovy
buildscript {

    // …

ext{
     kotlinVersion = '1.3.72' // (check what the latest version is!)
}
    dependencies {
        // ...
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion"
    }
}
```
Under allprojects repositories section add google and maven. 

```groovy
// Note: add the 'allproject' section if it doesn’t exist
allprojects {
    repositories {
        // ...
        google()
        maven {
            // All of Detox' artifacts are provided via the npm module
            url "$rootDir/../node_modules/detox/Detox-android"
        }
    }
}
```

### **2. Update app/build.gradle file**

In your app’s `buildscript` (i.e. `android/app/build.gradle`) add this in `dependencies` section:

```groovy
dependencies {
    // ...
    androidTestImplementation('com.wix:detox:+')
    implementation 'androidx.appcompat:appcompat:1.1.0'
}
```

... and add this to the `defaultConfig` subsection:

```groovy
android {
  // ...
  
  defaultConfig {
      // ...
      testBuildType System.getProperty('testBuildType', 'debug')  // This will later be used to control the test apk build type
      testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'
  }
}
```

### **3. Create Detox test class**

Create DetoxTest.java file under android/app/src/androidTest/java/com/[your.package]. In case you don't have those folders - create them.

Paste [this code](https://github.com/wix/Detox/blob/master/examples/demo-react-native/android/app/src/androidTest/java/com/example/DetoxTest.java) into DetoxTest.java file.

Note: Remove TestButler line 27 in case you're not using it.

### **4. Enable clear-text (unencrypted) traffic for Detox**

Put the following code into `android/app/src/main/res/xml/network_security_config.xml`. In case you don't have this file - create it.

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">localhost</domain>
    </domain-config>
</network-security-config>
```

Update app's `AndroidManifest.xml`

```xml
<manifest>
  <application 
        ...
        android:networkSecurityConfig="@xml/network_security_config">
  </application>
</manifest>
```

## Run tests to make sure the configuration is correct

```sh
detox build -c <configuration name>

npx react-native start

detox test -c <configuration name>
```