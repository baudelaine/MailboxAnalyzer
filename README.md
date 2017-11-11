# MailboxAnalyzer

## Flow
![Flow](https://github.com/baudelaine/MailboxAnalyzer/blob/master/mailbox.analyzer.flow.jpg)

### Prerequisites

Download and install the [cf](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) command from Cloud Foundry.

If testing with Windows download both [curl and jq](wintools.zip) commands and unzip them in your Cloud Foundry root path (e.g: C:\Programmes\Cloud Foundry).

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

Every further variables - including ${} - like ${something} have to be substituted with your own environment variables:

* e.g.
  * ${userid} will become yourUserid

**!!! WARNING !!!**

Before being able to log to Bluemix with cf command you should be aware of **2** things:
  1. the name of your **organization**, which is the same among all Regions (Germany, Sydney, United Kingdom and US South).
  2. the name of one **space** - which is assigned to one Region only - in one Region (Germany, Sydney, United Kingdom or US South) in your organization.

> At least one organization has been created automatically, but no space is created for you.
If not sure about organization name and if a space is available then log in [Bluemix console](https://console.bluemix.net/account/manage-orgs) to get your organization name, check that 'Spaces in Region' is not empty and if so then Add a space.

Now you should know both your organization and your space in one Region and your are ready to connect to Bluemix in command line.

### Setup Environment

Connect to Bluemix US South Region:
```
cf l -a https://api.ng.bluemix.net -u ${userid} -p ${password} --skip-ssl-validation -s ${space} -o ${organization}
```
or connect to Bluemix United Kingdom Region:
```
cf l -a https://api.eu-gb.bluemix.net -u ${userid} -p ${password} --skip-ssl-validation -s ${space} -o ${organization}
```

### Create Tone Analyzer service:
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

### Create Natural Language Understanding service:
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

### Create Discovery service:
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

### Create **coll0** Collection for Discovery service:

Before being able to create a collection 2 steps have to be completed:

   1. Create a environment.
   2. Create a configuration in this environment.

Create **env0** environment for Discovery service:
```
curl -X POST -u ${username}:${password} -H "Content-Type: application/json" -d '{"name": "env0"}' "${url}/v1/environments?version=2017-09-01"
```

Get **environment_id** for Discovery service:
```
curl -u ${username}:${password} "${url}/v1/environments?version=2017-09-01" | jq --arg ENV env0 '.environments[] | select(.name == $ENV) | .environment_id'
```

Create **configuration** for Discovery service with **environment_id** from above:
```
curl -u ${username}:${password} ${url}/v1/environments/${environment_id}/configurations?version=2017-09-01
```

Get **configuration_id** for Discovery service
```
curl -u ${username}:${password} "${url}/v1/environments/${environment_id}/configurations?version=2017-09-01" | jq '.configurations[] | .configuration_id'
```

Now, you should be ready to create the collection.

Create collection **coll0** for Discovery service:
```
curl -X POST -H "Content-Type: application/json" -u ${username}:${password} -d '{"name": "coll0", "configuration_id":"${configuration_id}" , "language": "en_us"}' ${url}/v1/environments/${environment_id}/collections?version=2017-09-01
```

Get collection_id for Discovery service:
```
curl -u ${username}:${password} "${url}/v1/environments/${environment_id}/collections?version=2017-09-01" | jq '.collections[] | .collection_id'
```

> You won't need your configuration_id nor environment_id, neither  configuration_id for further use but keep **env0** and **coll0** in mind.

### Create Visual Recognition service:
> Syntax: cf cs ${service} ${plan} ${service_instance}
```
cf cs watson_vision_combined free wvc0
```

Create service key (credential) to grant access to service:
> Syntax: cf csk ${service_instance} ${service_key}
```
cf csk wvc0 user0
```

Check that service key has been created:
> Syntax: cf sk ${service_instance}
```
cf sk wvc0
```

> You are done with environment setup. Now at least for Watson services should be created (**ta0, nlu0, dsc0 and wvc0**) in your space.
Check it with:
```
cf s
```

### Setup applications

Download [code](https://github.com/baudelaine/MailboxAnalyzer/archive/master.zip) unzip and change to this newly created directory (e.g.: MailboxAnalyzer-master).

> Now if you stand in the correct directory, you should be able to list directory such as **WebContent** and file such as **manifest.yml**.

Before deploying the application you need to choose a **unique name** (in eu-gb.mybluemix.net) for your application and update the manifest.yml accordingly by substituting **${appName}** with the name of your choice:
```
applications:
- host: ${appName}
  disk: 256M
  name: ${appName}
  path: ./WebContent
  domain: eu-gb.mybluemix.net
  mem: 256M
  instances: 1
  services:
  - dsc0  
  - ta0
  - nlu0
  - wvc0
```

If you changed Discovery Environment name and/or Discovery Collection name then update WebContent/res/conf.properties accordingly.
Otherwise jump to [Deploy Section](#deploy-the-application).
```
VCAP_SERVICES=
CLEAN_DCOLL_AT_STARTUP=true
NLU_NAME=natural-language-understanding
NLU_VERSION=/v1/analyze?version=2017-02-27
TA_NAME=tone_analyzer
TA_VERSION=/v3/tone?version=2016-05-19
DSC_NAME=discovery
DSC_VERSION=/v1/environments?version=2017-09-01
DSC_ENV_NAME=${environment_name}
DSC_COLL_NAME=${collection_name}
WVC_NAME=watson_vision_combined
WVC_VERSION=/v3/classify?version=2016-05-20
```

### Deploy the application

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

## Running the tests

Copy urls columns content. It should be **${appName}.eu-gb.mybluemix.net**
Paste it in a Web brower and check application is running.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With


## Contributing

## Versioning

## Authors

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
