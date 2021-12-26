# Guide Mobile App

## Goal and Scope

The history of calculation, information processig and computation is very rich quickly accelerating over the past century and is driving the industrial revolution and digital transformation of our world. It is marked by many events related to conceptual and technological breakthrough driving by several people and companies. In order to help in the analysis (by researchers) and explanation (to citizens), the NAM-IP Computer Museum developed and released an open source framework based on a the structuration of events in the form of timeline fragments that can be explored using various navigation operation to focus on specific period, aspects (technological, conceptual, cultural, contextual,...) or involved people/organisation.

<img src="https://github.com/NAMIP-Computer-Museum/guideApp/blob/main/assets/Illustrations/map.png?raw=true" width="400" />

The current scope is computing heritage and its validation is still on-going in this domain. However the concept could be enlarged any type of historical event and be used by other museum.

## Design ideas / features

The framework is designed in two main components:
* a knowledge base back-end to structure all the relevant information, a conceptual model was developed based on different standards (SEM, DOLCE/Spatial History Ontlogy, Constructed Past Theory, DBPedia) and accessed through queries and/or a specific API to extract a relevant timeline
<img src="https://github.com/NAMIP-Computer-Museum/guideApp/blob/main/assets/Illustrations/metamodel4.png?raw=true" height="400" />
* a navigation front-end, currently based on ReactNative and that can easily be deployed as mobile application
<img src="https://github.com/NAMIP-Computer-Museum/guideApp/blob/main/assets/Illustrations/protonav.jpg?raw=true" width="800" />

Typical timelines are the following:
* actors at different granularity levels: it can be the life of a person, a group or a company, possibly with a focus on common event characteristics,
* object(s) also at different granularity levels: it could relate to the precise history of a specific object (e.g. the design of the LISA computer) but also of a family of objects according to specific criteria, e.g. micro-computer of a specific period, manufacturer, using a specific CPU,...
* temporal, spatial or thematic contexts, respectively through specific Event (dates), Location or Tag characteristics. Different granularity levels can also be considered, e.g. to reflect the computer history related to micro-computer in France from 1970 to 1985. This can come as additional filter for the previous types of timelines.

Some timeline navigation operations:
* event pivoting between related entities or features: e.g. from Amiga 500 computer to Commodore Company or the 68k CPU or GUI timeline.
* time zoom in/out based on a defined period, e.g. the micro-computer history can be divided in early, golden age and standardisation periods.
* actor zoom in/out, from person level to company.
* object zoom in/out, e.g. down to version/variant level and up to product family level.
* relations inclusion, possibly iterative and with closure, e.g. to follow casual relation to look for causes/consequences related to some events.
* combining multiple timelines together, either merged or keeping them separated with an adequate visualisation (temporal alignment, shared events, specific relations...)

## Status and Testing

A full prototype was developped and is currently used in the museum with the following scope
* timelines of the micro-computer period (1970-1990) as support of the "micro-computer meg@ revolution" exhibition
* coverting machines, user interface, operating systems, micro-processor evolution
* trilingual: French/English/Dutch
* support for high quality images (with zoom) and video replay
* integrated quiz (only in French, a few random questions but not generated from knowledge base)
* resources are fully bundled (internal sqlite, pictures, vidéos) so does not required WIFI 
(in principle but a react-native dependency actually require Internet access even though nothing is exchanged) 
* android APK available for download here:  https://drive.google.com/file/d/17YhNBCE-d_gmcUPEi_gO5CmNyrL9eU7B/view?usp=sharing

# Ongoing and Future work
 
* REST API (OpenAPI) design and implementation for decoupling knowledge base back-end and navigation front-end 
* event extraction from various open data sources, generic (DBpedia) or more specialised (museum inventory application)
* deployment on the full exhibition timeline of our museum
* improved integration with physical artefact (qrcode)
* more elaborated web-client
* event learning, reliability ranking
* ...

## Documentation

* Global design (pre-print): <available soon>
* Full documentation (in French for now): https://docs.google.com/document/d/1msaaAXbRw0v6dPNfQ5gp6QIruDdsJgZYKkbkeLflYXs
  
## Contributors
  
* Aurélien Masson (ESEO), react native prototype
* Christophe Ponsard (CETIC/Nam-IP), design & architecture
* Thomas Collignon (UNamur), API
* Ward Desmet (NAM-IP), NL translations
* Marie Gevers (UNamur), texts
