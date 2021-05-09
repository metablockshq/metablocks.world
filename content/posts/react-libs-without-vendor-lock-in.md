---
publishedOn: 2020-02-13
title: Use 3rd party React Components without vendor lock-in
featured: false
heroImg: /img/content/posts/react-libs-without-vendor-lock-in.png
relatedSlugs:
  - startup-ideas-from-feb-2020
  - clojure-424-days
  - simple-ui-hack-to-improve-onboarding-ux
tags:
  - react
  - software-dev
author: shivekkhurana
slug: react-libs-without-vendor-lock-in
---

*Photo by [chris panas](https://unsplash.com/@chrispanas?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/lock?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

# Switching Component Libraries is hard 

You just found out that a Modal library you use is malicious and can potentially steal user data. 

You want to replace this library ASAP. But your app is in prod and has over 100 usage instances. What will you do?

I was in a similar situation, except the library we depended on wasn't rogue. We needed to change the library because we found a better one.

Updating a library is hard because every library has a different API. 

To future proof our applications, we introduced the concept of Component Interfaces. It's fairly simple but I have not seen it being used often, hence this blog post.

# Component Interfaces
Assume we want to import a modal library which has the following API:

```javascript
import Modal from '@demo/Modal';

<Modal
    open={true} // bool
    large={false} // bool
    title="Hello" // string
    contents={<Contents />} // React Node
/>
```
### Define an interface over 3rd party Modal
Instead of importing `Modal` directly, we create an interface component. 

```javascript
import Modal as BaseModal from '@demo/Modal';

const Modal = ({children, open, title}) => (
    <BaseModal
        large={false}
        title={title}
        open={open}
        contents={children}
    />
);

export default Modal;

```

### Use the lib via your instance
Use this interface in place of the 3rd party library:

```javascript
import Modal from '../components/interfaces/Modal';

const Profile = () => {
    return (< div>
        ...
        <Modal open={isModalOpen} title="Modal Via Interface">
            < div>Modal Content</ div>
        </Modal>
        ...
    </div>)
}
```

# Why Component Interfaces are better?

## Makes switching easy
We just need to replace the `BaseModal` in the interface with the new Modal library and all other instances will just work.

Once a developer has set up the interface, other team members can skip studying the actual library, and simply use the pared-back interface.

## Allows for global config
Notice how our Modal interface didn't accept a `large` prop, instead set it to `false`. This lets you have a global configuration. If you notice, we also changed the props. Our interface accepts `children` but the 3rd party lib accepts `contents`.

# Conclusion

Component interfaces help circumvent vendor lock-in and allow for easy updates. They also help simplify the actual API and give an ability to set sane defaults.

