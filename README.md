# [Clash of Clans](https://supercell.com/en/games/clashofclans/) Training Menu recreated as a web app using SvelteJS

<details>
<summary> Introduction</summary>
<br>
Hello everyone, here's my crown jewel (till date) project as an aspiring Front-end Developer: A fully functional implementation of the famous game Clash of Clan's in-game training menu.

I've played the game ever since its release (I was in grade 4, used to play it on my dad's phone, fond memories🥰) and have always loved the artstyle, sound effects and the overall bright and sunshine-y aesthetic of it.

I also really really like its UI and that's what got me motivated to try recreating it as a web application. It also seemed like a perfect project to learn SvelteJS as I've heard a lot of good things about it, gotta say, it lives up to them! As mentioned, I also adore the sound effects and have included them as well throughout the application, more fun!

I also didn't want to one-to-one replicate it as firstly to hone my originality/creativity which is a must for a front-end developer and secondly it wouldn't be possible on the web (not as easily at least haha).
To my jaw-dropping surprise, what I've created here is now somewhat similar to what the current 'info' tab for entities (troop, spell, sieges) looks like (as I had started this project in late August '23).

I want to give a big thank you to [Clash of Clans Fandom](https://clashofclans.fandom.com) for the detailed statistics of the entities. Of course, a big thanks to [Clash of Clans](https://supercell.com/en/games/clashofclans/) for making such an enjoyable game.
**This project is entirely non-profit, as it is only a means to showcase my skills as a front-end developer. I have no ill-intent on/by using the resources, no copyright infringement is intended.**

</details>

----

## Screenshots :camera:

#### Initial Screen (Landing)

https://github.com/Skyoxima/CoC_Training_Menu/assets/104982200/e36dc512-4976-47d9-9345-5bc29b10aa51

All the glowing 'interactables' are the way to open the menu, similar to the game! Pair-wise color coding based on the 'type' of 'entity' (troops, spells, siege).

### The Menu

#### Troops Section

https://github.com/Skyoxima/CoC_Training_Menu/assets/104982200/246a0c1c-1a53-4b0c-b7a0-d60f62db7a0e

#### Spells Section

https://github.com/Skyoxima/CoC_Training_Menu/assets/104982200/0bec69ab-226a-4399-a851-447edba35487

#### Siege Section

https://github.com/Skyoxima/CoC_Training_Menu/assets/104982200/df3480a2-8666-4d77-a0a6-3a7e2da60db1

#### Army Section + Tab Switching

https://github.com/Skyoxima/CoC_Training_Menu/assets/104982200/131236da-351f-402a-8c8b-7fb54b635dcd


**So here's the face of the project, the actual menu. As can be seen, I've tried to replicate its look from the in-game counterpart but have added some more color-coding for the type of entity for better distinction and visuals :D.** 

Now onto the functionalities!

### Menu Functionalities

#### Training an Entity

https://github.com/Skyoxima/CoC_Training_Menu/assets/104982200/84716994-74d4-4cc1-ba10-061b380ee3f6

**This is how I've implemented the training mechanism, pretty happy with it haha! Additionally, as seen, boosting and finishing training are also implemented with (fake) gems!**

#### Entity Information Dialog-box

https://github.com/Skyoxima/CoC_Training_Menu/assets/104982200/860f787b-0a29-4f59-894f-8e1df731b467

**All the information is stored neatly in JSON files, retrieved as demanded by the app on 'i' icon click. Curating this data was a fun and good experience!**

> I know at TH12 everything's not unlocked let alone at max level, call it creative liberty as I could only record my at-the-time base in high quality for the background.

#### Some attention-to-detail

Barracks, Spell Factories and the Workshop are all reactive i.e play "active" animation (which I have re-created from scratch in a video editor using the frame-by-frame images as I couldn't find a good enough quality gif). Once nothing's cooking, they revert back to "inactive" state.

https://github.com/Skyoxima/CoC_Training_Menu/assets/104982200/c6350b27-1d4c-4f8d-87f1-b9bf6c1d2989

----

# TODOs
- Improve responsiveness (especially for mobile devices, have a landscape orientation enforcement like the game).
- Optimize asset loading!
- Add Quick Train functionality.
- Add subtle attention-to-detail. (Training boost tab icons, heroes info tabs, etc.)
- Entity gallery (especially for troops, thinking alternative model art and level-wise sprites progression sequence) (will take a LOT of images)
