---
chapterNumber: 8
emoji: 📜
title: Meta Blocks Schema
subTitle: Configuration to re-render images when a deposit or a withdrawal is amde
slug: meta-blocks-upgrad-schema
guideSlug: protocol
---
When a component NFT is deposited into the smart contract, the meta NFT is updated as follows:
1. All attributes of components are assigned to meta NFT
2. Url to metadata of all components are saved in the metadata under the key `mbkComponents`
3. The preview image of the meta NFT is re-rendered to reflect the latest deposits or withdrawal

The image is re-rendered on each deposit and withdrawal. This updating of the meta NFT is the secret sauce to composition. 

Since there is no way to render images on-chain, this metadata update happens on an off-chain service. 

Meta Blocks comes with a simple image upgrade mechanism, where images can be overlapped. For more complex cases, you'll need to create your own image renderer. Message us on Twitter or Discord if this mechanism is not enough for your use-case.

## Defining layer indices
The default image-renderer assumes that all upgrades happen by stacking one image on top of another.

For example, assume you have an avatars project with:
- a base face
- a pair of sun-glasses

Both these items items are two separate NFTs. And you want to compose them using the Meta Blocks protocol. 

To achieve this, you can add a section to metadata of both these NFTs as follows.

In the base face metadata add:

```json
  ...
  "mbkComponentNFTSchemaVersion":0,
  "mbkComponentNFTSchemaData": {
    "zIndex": 0
   },
```

and to the pair of sun-glasses, add:
In the base face metadata add:

```json
  ...
  "mbkComponentNFTSchemaVersion":0,
  "mbkComponentNFTSchemaData": {
    "zIndex": 1
   },
```

The `mbkComponentNFTSchemaVersion` defines the version of the off-chain renderer you wish to use. Currently its version 0.

The `mbkComponentNFTSchemaData` defines the configuration for that version. Version 0 expects only one configuration, that is the `zIndex`. 

In this case, we configured the base head to be at zIndex 0 and the sun-glasses to be at zIndex 1. 

While creating the images, you need to ensure that these images are of the same dimensions, and fit well when overlayed. 

With the schema in place, the renderer will update the metadata and the image correctly.