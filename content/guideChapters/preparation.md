---
chapterNumber: 2
emoji: 👩‍🎨
title: Prepare environment
subTitle: Let's prepare our working environment.
slug: preparation
tags:
  - blockchain
guideSlug: anchor
---
## Create an anchor Project

### 1.  Run the following command

```bash
anchor init spl-token
```

This will initialise a project like this below.

![](/img/content/guide-chapters/blog_post_1.png "Initialise program")

Open in your favourite editor and start doing the changes. 

### 2. Run the below command

```bash
anchor test
```

This will install all dependencies of the project.

### 3. Change Program ID

Usually it is a good idea to change the ProgramID of the program. Get the public address of the `spl-token` program by running the following command

```bash
solana-keygen pubkey target/deploy/spl_token-keypair.json
```

This will give you the output as below

![](/img/content/guide-chapters/blog_image_2.png "program id")

Replace `29iiLtNregFkwH4n4K95GrKYcGUGC3F6D5thPE2jWQQs` in `declare_id` of `lib.rs` file

![](/img/content/guide-chapters/image_3.png "code")

Also replace the address in `Anchor.toml` file of the project 

![](/img/content/guide-chapters/image_4.png "toml file")

With this we are ready to create our first mint. In the next chapter, will look at creating a new mint