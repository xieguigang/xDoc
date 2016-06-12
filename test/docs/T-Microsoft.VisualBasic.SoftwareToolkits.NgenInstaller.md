
# NgenInstaller
_namespace: [Microsoft.VisualBasic.SoftwareToolkits](N-Microsoft.VisualBasic.SoftwareToolkits.md)_

Ngen.exe (Native Image Generator)
 
 The Native Image Generator (Ngen.exe) is a tool that improves the performance of managed applications. 
 Ngen.exe creates native images, which are files containing compiled processor-specific machine code, 
 and installs them into the native image cache on the local computer. The runtime can use native images 
 from the cache instead of using the just-in-time (JIT) compiler to compile the original assembly.
 
 Changes To Ngen.exe In the .NET Framework 4
 Ngen.exe now compiles assemblies With full trust, And code access security (CAS) policy Is no longer evaluated.
 Native images that are generated With Ngen.exe can no longer be loaded into applications that are running In Partial trust.
 
 Changes To Ngen.exe In the .NET Framework version 2.0:
 Installing an assembly also installs its dependencies, simplifying the syntax Of Ngen.exe.
 Native images can now be Shared across application domains.
 A New Action, update, re - creates images that have been invalidated.
 Actions can be deferred For execution by a service that uses idle time On the computer To generate And install images.
 Some causes Of image invalidation have been eliminated.

### Methods

#### Display
Display the state of the native images for an assembly and its dependencies.
 If no argument Is supplied, everything In the native image cache Is displayed.
#### ExecuteQueuedItems
Execute queued compilation jobs.
 If a priority Is specified, compilation jobs With greater Or equal priority are executed. 
 If no priority Is specified, all queued compilation jobs are executed.
#### Install
将当前目录下的所有的.NET程序都进行安装
#### Queue
Pause the native image service, allow the paused service to continue, or query the status of the service.
#### Uninstall
Delete the native images of an assembly and its dependencies from the native image cache.
 To uninstall a single image And its dependencies, use the same command-line arguments that were used to install the image.
 
 Note In the .NET Framework 4, the action uninstall * Is no longer supported.
#### Update
Update native images that have become invalid.
 If /queue Is specified, the updates are queued For the native image service. Updates are always scheduled at priority 3, so they run When the computer Is idle.



