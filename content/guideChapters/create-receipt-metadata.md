---
chapterNumber: 7
emoji: 🔗
title: Creating receipt metadata for deposits
slug: create-receipt-metadata
guideSlug: protocol
---
When a component NFT is a deposited, a receipt NFT is returned to the depositor's wallet. 

The deposit function takes a URI for the metadata of the receipt. This is useful to add information to the receipt NFT. For example, you can add a "Lock Icon" overlay on top of the original image of the NFT. You can also add your logo.

This metadata is a standard Metaplex Metadata. You can build your own service to generate receipt metadata or use the Meta Blocks service. This service is free to use at the moment and will be open-sourced soon.

## Generate receipt metadata
The hosted receipt metadata generator service resides on AWS. The public URI of the service is:

Production: `https://ctvymyaq3e.execute-api.ap-south-1.amazonaws.com/Prod/receipt-shortener`

Development: ``

To generate a receipt metadata url, you can send a post request to this service with 3 parameters:
- Arweave metadata url of the component NFT
- Wallet address of the depositor and
- Universe address

```js
const RECEIPT_URL =
  "https://ctvymyaq3e.execute-api.ap-south-1.amazonaws.com/Prod/receipt-shortener";

const getShortenedReceiptUrl = async ({
  arweaveUrl,
  universeAddress,
  walletAddress,
}) => {
  try {
    const data = {
      universeAddress: universeAddress,
      walletAddress: walletAddress,
      arweaveUrl: arweaveUrl,
    };

    const result = await axios.post(RECEIPT_URL, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
   ⃔ });

    return result.data;
  } catch (err) {
    throw err;
  }
};

```

The return value of the function will be a URL pointing to a Metaplex compatible metadata. This metadata will have all the attributes of the component NFT. 

The only difference is that the name of the original component will be appended with `🔒 Receipt: `. 

For example, if you generate the receipt URl for an NFT named "Boryuku Dragon #43", in the receipt metadata, the name will be changed to `🔒 Receipt: Boryuku Dragon #43`. This will help the user identify the receipts in their wallets.