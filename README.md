# kush-cultivation-next
E-Commerce website for a friend's grow-room business - now with NextJS

Initially designed as a frontend-only website using React. Obvious security issues called for implementing a "backend". So here we are.

<h2>Embarrassing notes:</h2>
Due to the migration (and pure laziness) I have not migrated all styling from the old stylesheets to the new NextJS 'xyz.module.css' format. There is a LOT of classes that will require renaming - not to mention the combination with Bootstrap classes and overwriting thereof. For example, className "navbar-brand" cannot be called as {styles.navbar-brand} due to the hyphen being reserved as the minus-operator. So any overwriting of bootstrap classes will need to be renamed to follow the camelCase format (navbarBrand). However, this doesn't mean the original class ("navbar-brand") can now be removed, because a lot of the original Bootstrap styling still depends on this class naming-scheme. This means I would have to combine both classes: `navbar-brand ${styles.navbarBrand}` </br>
Ugh.</br>
So I decided to just move all the stylesheets to the "styles" folder and import from there. This produced another issue - NextJS doesn't allow importing standard Stylesheets from here unless they're all import in app.js. </br>
And now, our final disgusting product:</br></br>
![Screenshot 2021-10-16 181905](https://user-images.githubusercontent.com/92632115/137594781-0d7423c2-0145-4579-b481-0e954106a2fd.png)
</br></br>
I'm sorry to whomever is viewing my code.
