# MailboxAnalyzer

## Flow
![Flow](https://github.com/baudelaine/MailboxAnalyzer/blob/master/mailbox.analyzer.flow.jpg)

### Prerequisites

Download and install the cf command from [Cloud Foundry](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)

Download [curl]( / / h t t p s : / / c u r l . h a x x . s e / d o w n l o a d . h t m l ),  command unzip it and copy i386 content in your Cloud Foundry root path (e.g: C:\Programmes\Cloud Foundry).

Download [j q](h t t p s : / / s t e d o l a n . g i t h u b . i o / j q / d o w n l o a d / )  command rename it from jq-win64 to jq  and copy it in your Cloud Foundry root path (e.g: C:\Programmes\Cloud Foundry).

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

*Every further variables - including ${} or <> - like ${something} or \<something\>
have to be substituted with your own environment variables:*

* e.g.
  * ${userid} will become yourUserid
  * \<org\> will become yourOrg

**!!! WARNING !!!**

Before being able to log to Bluemix with cf command you should be aware of **2** things:
  1. the name of your **organization**, which is the same among all Regions (Germany, Sydney, United Kingdom and US South).
  2. the name of one **space** - which is assigned to one Region only - in one Region (Germany, Sydney, United Kingdom or US South) in your organization.

> At least one organization has been created automatically, but no space is created for you.
If not sure about organization name and if a space is available then log in [Bluemix console](https://console.bluemix.net/account/manage-orgs) to get your organization name, check that 'Spaces in Region' is not empty and if so then Add a space.

Now you should know both your organization and your space in one Region and your are ready to connect to Bluemix in command line.

### Setup Environment

Connect to Bluemix US SOUTH Region:
```
cf l -a https://api.ng.bluemix.net -u ${userid} -p ${password} --skip-ssl-validation -s ${space} -o ${org}
```
or connect to Bluemix United Kingdom Region:
```
cf l -a https://api.eu-gb.bluemix.net -u ${userid} -p ${password} --skip-ssl-validation -s ${space} -o ${org}
```

### C r e a t e   T o n e   A n a l y z e r   s e r v i c e :
> Syntax: cf cs ${service} ${plan} ${service_instance}
```
c f   c s   t o n e _ a n a l y z e r   s t a n d a r d   t a 0 
```

Create service key (credential) to grant access to service:
> Syntax: cf csk ${service_instance} {service_key}
```
cf csk ta0 user0
```

Check that service key has been created:
> Syntax: cf sk ${service_instance}
```
cf sk ta0
```

### C r e a t e   N a t u r a l   L a n g u a g e   U n d e r s t a n d i n g   s e r v i c e :
> Syntax: cf cs ${service} ${plan} ${service_instance}
```
c f   c s   n a t u r a l - l a n g u a g e - u n d e r s t a n d i n g   f r e e   n l u 0 
```

Create service key (credential) to grant access to service:
> Syntax: cf csk ${service_instance} {service_key}
```
c f   c s k   n l u 0   u s e r 0 
```

Check that service key has been created:
> Syntax: cf sk ${service_instance}
```
cf sk nl0
```

At any time you should be able to get your credential (url, port, username, password...) for one of your service instance.
> Syntax: cf service-key ${service_instance} ${service_key}
```
cf service-key dsc0 user0
```

### C r e a t e   D i s c o v e r y   s e r v i c e: 
  > Syntax: cf cs ${service} ${plan} ${service_instance}
```
c f   c s   d i s c o v e r y   l i t e   d s c 0 
```

Create service key (credential) to grant access to service:
> Syntax: cf csk ${service_instance} {service_key}
```
c f   c s k  dsc0  u s e r 0 
```

Check that service key has been created:
> Syntax: cf sk ${service_instance}
```
cf sk dsc0
```
### C r e a t e   **coll0** Collection  f o r   D i s c o v e r y   s e r v i c e :

Before being able to create a collection 2 steps have to be completed:

   1. Create a environment.
   2. Create a configuration in this environment.

C r e a t e   **env0** e n v i r o n m e n t   f o r   D i s c o v e r y   s e r v i c e :
```
 c u r l   - X   P O S T   - u   $ { u s e r n a m e } : $ { p a s s w o r d }   - H   " C o n t e n t - T y p e :   a p p l i c a t i o n / j s o n "   - d   ' { " n a m e " :   " e n v 0 " } '   " $ { u r l } / v 1 / e n v i r o n m e n t s ? v e r s i o n = 2 0 1 7 - 0 9 - 0 1 " 
```
 
 G e t   **e n v i r o n m e n t _ i d**   f o r   D i s c o v e r y   s e r v i c e :
```
 c u r l   - u   $ { u s e r n a m e } : $ { p a s s w o r d }   " $ { u r l } / v 1 / e n v i r o n m e n t s ? v e r s i o n = 2 0 1 7 - 0 9 - 0 1 "   |   j q   - - a r g   E N V   e n v 0   ' . e n v i r o n m e n t s [ ]   |   s e l e c t ( . n a m e   = =   $ E N V )   |   . e n v i r o n m e n t _ i d ' 
```
 
 C r e a t e  ** c o n f i g u r a t i o n**   f o r   D i s c o v e r y   s e r v i c e   w i t h  ** e n v i r o n m e n t _ i d**   f r o m   a b o v e :
```
 c u r l   - u   $ { u s e r n a m e } : $ { p a s s w o r d }   $ { u r l } / v 1 / e n v i r o n m e n t s / $ { e n v i r o n m e n t _ i d } / c o n f i g u r a t i o n s ? v e r s i o n = 2 0 1 7 - 0 9 - 0 1 
```
 
  G e t  ** c o n f i g u r a t i o n _ i d**   f o r   D i s c o v e r y   s e r v i c e 
 ```
 c u r l   - u   $ { u s e r n a m e } : $ { p a s s w o r d }   " $ { u r l } / v 1 / e n v i r o n m e n t s / $ { e n v i r o n m e n t _ i d } / c o n f i g u r a t i o n s ? v e r s i o n = 2 0 1 7 - 0 9 - 0 1 "   |   j q   ' . c o n f i g u r a t i o n s [ ]   |   . c o n f i g u r a t i o n _ i d ' 
 ```

Now, you should be ready to create the collection.

 C r e a t e   c o l l e c t i o n   f o r   D i s c o v e r y   s e r v i c e :
 ```
 c u r l   - X   P O S T   - H   " C o n t e n t - T y p e :   a p p l i c a t i o n / j s o n "   - u   $ { u s e r n a m e } : $ { p a s s w o r d }   - d   ' { " n a m e " :   " c o l l 0 " ,   " c o n f i g u r a t i o n _ i d " : " $ { c o n f i g u r a t i o n _ i d } "   ,   " l a n g u a g e " :   " e n _ u s " } '   $ { u r l } / v 1 / e n v i r o n m e n t s / $ { e n v i r o n m e n t _ i d } / c o l l e c t i o n s ? v e r s i o n = 2 0 1 7 - 0 9 - 0 1 
 ```

 G e t   c o l l e c t i o n _ i d   f o r   D i s c o v e r y   s e r v i c e :
  ```
 c u r l   - u   $ { u s e r n a m e } : $ { p a s s w o r d }   " $ { u r l } / v 1 / e n v i r o n m e n t s / $ { e n v i r o n m e n t _ i d } / c o l l e c t i o n s ? v e r s i o n = 2 0 1 7 - 0 9 - 0 1 "   |   j q   ' . c o l l e c t i o n s [ ]   |   . c o l l e c t i o n _ i d ' 
  ```

> You won't need your c o n f i g u r a t i o n _ i d, nor  e n v i r o n m e n t _ i d, neither  c o n f i g u r a t i o n _ i d for further use but keep **env0** and **coll0** in mind.

### C r e a t e   V i s u a l   R e c o g n i t i o n   s e r v i c e :
> Syntax: cf cs ${service} ${plan} ${service_instance}
```
 c f   c s   w a t s o n _ v i s i o n _ c o m b i n e d   f r e e   wvc 0 
```

Create service key (credential) to grant access to service:
> Syntax: cf csk ${service_instance} {service_key}
```
cf csk wvc0 user0
```

Check that service key has been created:
> Syntax: cf sk ${service_instance}
```
cf sk wvc0
```

> You are done with environment setup. Now at least for Watson services should be created (ta0, nlu0, dsc0 and wvc0) in your space.
Check it with:
```
cf s
```

### Setup applications

 D o w n l o a d  [ c o d e]( h t t p s : / / g i t h u b . c o m / b a u d e l a i n e / M a i l b o x A n a l y z e r /a r c h i v e / m a s t e r . z i p )  u n z i p and   change to this directory (e.g.:  M a i l b o x A n a l y z e r -master).

> Now if you stand in the correct directory, you should be able to list directory such as WebContent and file such as manifest.yml.

 B e f o r e   d e p l o y i n g   t h e   a p p l i c a t i o n   y o u   n e e d   t o  choose a unique name (in e u - g b . m y b l u e m i x . n e t) for your application and  u p d a t e   t h e   m a n i f e s t . y m l   a c c o r d i n g l y  by substituting ${appName} with the name of you choice:
  ```
a p p l i c a t i o n s : 
 -   h o s t :   ${appName}
     d i s k :   2 5 6 M 
     n a m e :   ${appName}
     p a t h :   . / W e b C o n t e n t 
     d o m a i n :    e u - g b . m y b l u e m i x . n e t 
     m e m :   2 5 6 M 
     i n s t a n c e s :   1 
     s e r v i c e s : 
     -   d s c 0     
     -   t a 0 
     -   n l u 0 
  - wvc0
```

If you changed Discovery Environment name and/or Discovery name then   u p d a t e   W e b C o n t e n t / r e s / c o n f . p r o p e r t i e s   a c c o r d i n g l y .
Otherwise jump to Deploy Section.
``` 
 V C A P _ S E R V I C E S = 
 C L E A N _ D C O L L _ A T _ S T A R T U P = t r u e 
 N L U _ N A M E = n a t u r a l - l a n g u a g e - u n d e r s t a n d i n g 
 N L U _ V E R S I O N = / v 1 / a n a l y z e ? v e r s i o n = 2 0 1 7 - 0 2 - 2 7 
 T A _ N A M E = t o n e _ a n a l y z e r 
 T A _ V E R S I O N = / v 3 / t o n e ? v e r s i o n = 2 0 1 6 - 0 5 - 1 9 
 D SC_ N A M E = d i s c o v e r y 
 D SC_ V E R S I O N = / v 1 / e n v i r o n m e n t s ? v e r s i o n = 2 0 1 7 - 0 9 - 0 1 
 D SC_ E N V _ N A M E = $ { e n v i r o n m e n t _ n a m e } 
 D SC_ C O L L _ N A M E =$ {collection_ n a m e } 
 WVC _ N A M E = w a t s o n _ v i s i o n _ c o m b i n e d 
 V R _ V E R S I O N = / v 3 / c l a s s i f y ? v e r s i o n = 2 0 1 6 - 0 5 - 2 0 
 ```
 
### Deploy the application

 N o w   w e   a r e   r e a d y   t o   d e p l o y   t h e   a p p l i c a t i o n :
```
 c f   p 
```
 
 O n c e   s t a g i n g   h a s   c o m p l e t e d   c h e c k   t h a t   a l l   s e r v i c e s   a r e   b o u n d : 
```
 c f   s 
```

 C h e c k   a p p l i c a t i o n   i s   r u n n i n g : 
```
 c f   a 
```

## Running the tests

 C o p y   u r l s   c o l u m n s   c o n t e n t .   I t   s h o u l d   b e  **${ a p p N a m e}  e u - g b . m y b l u e m i x . n e t **
 P a s t e   i t   i n   a   W e b   b r o w e r   a n d   c h e c k   a p p l i c a t i o n   i s   r u n n i n g . 

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
