# Mailbox Analyzer

## Flow
![Flow](mailbox.analyzer.flow.jpg)

### About IBM Cloud Watson services being used in the application
![](ta50x.png)

[Documentation](https://console.bluemix.net/docs/services/tone-analyzer/getting-started.html)
[Dashboard](https://www.ibm.com/watson/developercloud/dashboard/en/tone-analyzer-dashboard.html)

> **Tone Analyzer** uses linguistic analysis to detect three types of tones from communications: emotion, social, and language.  This insight can then be used to drive high impact communications.

![](nlu50x.png)

[Documentation](https://console.bluemix.net/docs/services/natural-language-understanding/getting-started.html)
[Dashboard](https://www.ibm.com/watson/developercloud/dashboard/en/natural-language-understanding-dashboard.html)

> **Natural Language Understanding** analyze text to extract meta-data from content such as concepts, entities, emotion, relations, sentiment and more.

![](dsc50x.png)

[Documentation](https://console.bluemix.net/docs/services/discovery/getting-started.html)
[Dashboard](https://www.ibm.com/watson/developercloud/dashboard/en/discovery-dashboard.html)

> **Discovery** add a cognitive search and content analytics engine to applications.

![](wvc50x.png)

[Documentation](https://console.bluemix.net/docs/services/visual-recognition/getting-started.html)
[Dashboard](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dashboard/en/visual-recognition-dashboard.html)

> **Visual Recognition** find meaning in visual content! Analyze images for scenes, objects, faces, and other content. Choose a default model off the shelf, or create your own custom classifier. Develop smart applications that analyze the visual content of images or video frames to understand what is happening in a scene.

### Overview of the application

A sample demo of the application with a mailbox analysis is available [here](http://app0.baudelaine.eu-gb.mybluemix.net).

### Setup Environment

**3** choices here:
  1. [GUI environment setup](#gui-environment-setup)
  2. [Windows automatic environment setup](#windows-automatic-environment-setup) - If testing with Windows and don't feel confortable with command line.
  3. [Command line environment setup](#login-to-ibm-cloud)
  
### GUI environment setup

Open [instructions](https://github.com/baudelaine/MailboxAnalyzer/blob/master/mailbox.analyzer.gui.environment.setup.pdf)

If everything worked you are now ready to [setup the application](#setup-application)

### Windows automatic environment setup

Download and install the [cf](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) command from Cloud Foundry.

Download both [curl and jq](wintools.zip) commands and unzip them in your Cloud Foundry root path (e.g: C:\Programmes\Cloud Foundry).

Open a Windows command prompt as Administrator.

Check cf command is available:
```
cf -v
```
Check curl command is available:
```
curl -V
```
Check jq command is available:
```
jq
```

**!!! WARNING !!!**

Before being able to log to IBM Cloud with cf command you should be aware of **2** things:
  1. the name of your **organization**, which is the same among all Regions (Germany, Sydney, United Kingdom and US South).
  2. the name of one **space** - which is assigned to one Region only - in one Region (Germany, Sydney, United Kingdom or US South) in your organization.

> At least one organization has been created automatically, but no space is created for you.
If not sure about organization name and if a space is available then log in [IBM Cloud console](https://console.bluemix.net/account/manage-orgs), click 'Cloud Foundry Orgs' then view details, check that 'Cloud Foundry Spaces in Region' is not empty and if so then Add a Cloud Foundry Space.

Now you should know both your organization and your space in one Region and your are ready to connect to Bluemix in command line.

Browse your Cloud Foundry root path (e.g: C:\Programmes\Cloud Foundry), edit envmgt.bat and set it accordingly:
```
set userid=
set password=
set space=
set org=
```

Open a Windows command prompt as Administrator and change to your Cloud Foundry root path:

```
cd "\Programmes\Cloud Foundry"
```

Display envmgt usage:

```
envmgt.bat /h
```

![](envmgt.bat.usage.jpg)

Login a IBM Cloud region:

```
envmgt.bat /lgb
```

Create all services and Discovery service Collection:

```
envmgt.bat /ca
```

If everything work you are now ready to [setup the application](#setup-application)

### Login to IBM Cloud

Download and install the [cf](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) command from Cloud Foundry.

If testing with Windows, download both [curl and jq](wintools.zip) commands and unzip them in your Cloud Foundry root path (e.g: C:\Programmes\Cloud Foundry).

For other platforms download and install [curl](https://curl.haxx.se/download.html) and [jq](https://stedolan.github.io/jq/download/) commands.

Open a Windows command prompt as administrator or a terminal on other platform.

Check cf command is available:
```
cf -v
```
Check curl command is available:
```
curl -V
```
Check jq command is available:
```
jq
```

**!!! WARNING !!!**

Before being able to log to IBM Cloud with cf command you should be aware of **2** things:
  1. the name of your **organization**, which is the same among all Regions (Germany, Sydney, United Kingdom and US South).
  2. the name of one **space** - which is assigned to one Region only - in one Region (Germany, Sydney, United Kingdom or US South) in your organization.

> At least one organization has been created automatically, but no space is created for you.
If not sure about organization name and if a space is available then log in [IBM Cloud console](https://console.bluemix.net/account/manage-orgs), click 'Cloud Foundry Orgs' then view details, check that 'Cloud Foundry Spaces in Region' is not empty and if so then Add a Cloud Foundry Space.

Now you should know both your organization and your space in one Region and your are ready to connect to Bluemix in command line.

**!!! WARNING !!!**

Every further variables - including ${} - like ${something} have to be substituted with your own environment variables:

* e.g.
  * ${userid} will become yourUserid

Connect to IBM Cloud US South Region:
```
cf l -a https://api.ng.bluemix.net -u ${userid} -p ${password} --skip-ssl-validation -s ${space} -o ${organization}
```
or connect to IBM Cloud United Kingdom Region:
```
cf l -a https://api.eu-gb.bluemix.net -u ${userid} -p ${password} --skip-ssl-validation -s ${space} -o ${organization}
```

### Create Tone Analyzer service
> Syntax: cf cs ${service} ${plan} ${service_instance}
```
cf cs tone_analyzer standard ta0
```

Create service key (credential) to grant access to service:
> Syntax: cf csk ${service_instance} ${service_key}
```
cf csk ta0 user0
```

Check that service key has been created:
> Syntax: cf sk ${service_instance}
```
cf sk ta0
```

### Create Natural Language Understanding service
> Syntax: cf cs ${service} ${plan} ${service_instance}
```
cf cs natural-language-understanding free nlu0
```

Create service key (credential) to grant access to service:
> Syntax: cf csk ${service_instance} ${service_key}
```
cf csk nlu0 user0
```

Check that service key has been created:
> Syntax: cf sk ${service_instance}
```
cf sk nlu0
```

### Create Discovery service
> Syntax: cf cs ${service} ${plan} ${service_instance}
```
cf cs discovery lite dsc0
```

Create service key (credential) to grant access to service:
> Syntax: cf csk ${service_instance} ${service_key}
```
cf csk dsc0 user0
```

Check that service key has been created:
> Syntax: cf sk ${service_instance}
```
cf sk dsc0
```

At any time you should be able to get your credential (url, port, username, password...) for one of your service instance.
> Syntax: cf service-key ${service_instance} ${service_key}
```
cf service-key dsc0 user0
```

### Create **coll0** Collection for Discovery service

Before being able to create a collection **2** steps have to be completed:

   1. Create a environment.
   2. Create a configuration in this environment.

**!!! WARNING !!!**

Latest version of Discovery service is 2017-11-07. So subsitute all followings **${version}** with **2017-11-07**.

Create **env0** environment for Discovery service:
```
curl -X POST -u ${username}:${password} -H "Content-Type: application/json" -d "{\"name\": \"env0\"}" "${url}/v1/environments?version=${version}"
```

Get **environment_id** for Discovery service
```
curl -u ${username}:${password} "${url}/v1/environments?version=${version}" | jq -r --arg ENV env0 ".environments[] | select(.name == $ENV) | .environment_id"
```

Create **configuration** for Discovery service with **environment_id** from above
```
curl -u ${username}:${password} ${url}/v1/environments/${environment_id}/configurations?version=${version}
```

Get **configuration_id** for Discovery service
```
curl -u ${username}:${password} "${url}/v1/environments/${environment_id}/configurations?version=${version}" | jq -r ".configurations[] | .configuration_id"
```

Now, you should be ready to create the collection.

Create collection **coll0** for Discovery service
```
curl -X POST -H "Content-Type: application/json" -u ${username}:${password} -d "{\"name\": \"coll0\", \"configuration_id\":\"${configuration_id}\" , \"language\": \"en_us\"}" ${url}/v1/environments/${environment_id}/collections?version=${version}
```

Get collection_id for Discovery service
```
curl -u ${username}:${password} "${url}/v1/environments/${environment_id}/collections?version=${version}" | jq -r ".collections[] | .collection_id"
```

> You won't need your configuration_id nor environment_id, neither  configuration_id for further use but keep **env0** and **coll0** in mind.

### Create Visual Recognition service
> Syntax: cf cs ${service} ${plan} ${service_instance}
```
cf cs watson_vision_combined free wvc0
```

Create service key (credential) to grant access to service
> Syntax: cf csk ${service_instance} ${service_key}
```
cf csk wvc0 user0
```

Check that service key has been created
> Syntax: cf sk ${service_instance}
```
cf sk wvc0
```

> You are done with environment setup. Now at least for Watson services should be created (**ta0, nlu0, dsc0 and wvc0**) in your space.
Check it with:
```
cf s
```

### Setup application

If not already done, download and install the [cf](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) command from Cloud Foundry.

Download [code](https://github.com/baudelaine/MailboxAnalyzer/archive/master.zip) unzip and change to this newly created directory (e.g.: MailboxAnalyzer-master/MailboxAnalyzer-master).

> Now if you stand in the correct directory, you should be able to list directory such as **WebContent** and file such as **manifest.yml**.

Before deploying the application you need to choose **3** things:
  1. A **host** (must be unique in a region or domain) for your application (e.g.: **mylastname-mycompagny**)
  2. A **name** (must be unique in your space) for your application (e.g.: **myapp0**)
  3. A **domain** among those available (e.g.: **eu-gb.mybluemix.net** or **mybluemix.net**)
  
Edit the manifest.yml and update it accordingly by substituting both **${host}**, **${name}** and **${domain}**:
```
applications:
- host: ${host}
  disk: 256M
  name: ${name}
  path: ./WebContent
  domain: ${domain}
  mem: 256M
  instances: 1
  services:
  - dsc0  
  - ta0
  - nlu0
  - wvc0
```

If you changed Discovery Environment name and/or Discovery Collection name then update WebContent/res/conf.properties accordingly.

**!!! WARNING !!!**

If you choosed GUI environment setup option, your Discovery service enrironment name has been set to **byod**. So edit **WebContent/res/conf.properties** and substitue **env0** with **byod**.

Otherwise leave WebContent/res/conf.properties unchanged and jump to [Deploy Section](#deploy-the-application).
```
...
DSC_ENV_NAME=env0
DSC_COLL_NAME=coll0
...
```

### Deploy the application

**!!! WARNING !!!**

For deployment to work you need to push your code from the same directory as **manifest.yml**.

Now you are ready to deploy the application:
```
cf p
```

Once staging has completed check that all services are bound:
```
cf s
```

Check application is running:
```
cf a
```

### Running the Application

Copy urls columns content. It should be **${unique name/host}.${domain}** (e.g.:myapp.eu-gb.mybluemix.net).
Paste it in a Web brower and check application is running.

### Todo List

The application is not finished yet. To look at attached files and pictures, open a new browser tab and append /res/mails/${filename} to application url (e.g.: http://app0.baudelaine.eu-gb.mybluemix.net/res/mails/bar.jpg).
