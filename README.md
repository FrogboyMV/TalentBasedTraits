# Talent-based Traits

## Introduction

This plugin allows you to grant your actors talent-based traits.  You will need to also install the FROG_TalentCore plugin to utilize this functionality.  What this means is that as your players build up their actor’s Traits, your game can add new abilities and bonuses to said actors based on their talent level.  This is useful for creating RPG systems that allow the player to customize their characters however they want as opposed to everything being determined by the character’s class.

Here are few examples of what you can easily implement with this plugin as your characters advance their talents.
* Adjust Elemental Resistance
* Increase Hit%, Critical% and/or Evade%
* Resist status ailments better
* Gain immunity to Poison and/or Disease
* Gain Extra Attacks
* Reduce Floor Damage
* Gain a chance to Poison or Blind when attacking
* Gain addition Skill Types
* Gain new weapon and armor proficiencies
* No longer risk being surprised during encounters

So for instance, say you've created a Talent called Armor Proficiency.  You can use this plugin to grant better classes of armor as they apply more ranks to this talent.  All characters would start out with something like Simple Armor which would probably just be Cloth but as they add ranks, they would gain access to Light Armor, then Medium Armor and finally Heavy Armor, or whatever progression you wanted for your game that fits your armor types.  The same could be done for weapons, skills, resistances or anything else that can be done with Traits.


## How to Use

Install this plugin as well as the FROG_TalentCore plugin.  Configure your Talents within the FROG_Talents plugin and then configure this one to grant Traits to any actor who spends their Talent points in certain areas.

**Description** - This is text that you’ll want to enter so that you’ll know what that particular talent-based trait is.

**Name** - When a player is adding ranks in the Talents screen, this text will display to let them know what new ability they will learn if they advance their talent to this level.

**Talent Abbr** - Enter in the Talent Abbreviation that you set up in the FROG_TalentCore plugin.

**Start Level** - This is the talent level/score that the actor this trait.

**End Level** - This is the talent level/score that this trait will expire. Because of the way MV stacks traits, it’s often times better to remove one and then replace it with a better version. Otherwise, newer version will be combined and produce harder to manage results.

**Trait-specific Parameters** - There will always be one or two parameters that you will fill in just as you would in the editor itself. Most of the time, you’ll be able to select easy to understand options from drop-down lists like “Encounter Half” for Party Ability. The exception to this are your custom Types in the database. For whatever reason, the 1.5 plugin parameters don’t have an option to generate a select list from these so you have to enter in the ID until this oversight is remedied.


*Example:*

I want to advance a character's armor proficiency for every 2 ranks in the Armor Proficiency Talent.  Let's say you have your armor types set up like this.

```
01 Simple Armor (Everyone gets this)
02 Light Armor
03 Light Shield
04 Medium Armor
05 Heavy Armor
06 Heavy Shield
```

Under Talent-based -> Equip -> Equip Armor, enter in these parameter values.

```
Description: Light Armor
Talent Abbr: armor (this is what you set the abbr to in your Talent)
Start Level: 2
End Level: 100
Armor ID: 2
```
```
Description: Light Shield
Talent Abbr: armor
Start Level: 4
End Level: 100
Armor ID: 3
```
```
Description: Medium Armor
Talent Abbr: armor
Start Level: 6
End Level: 100
Armor ID: 4
```
```
Description: Heavy Armor
Talent Abbr: armor
Start Level: 8
End Level: 100
Armor ID: 5
```
```
Description: Heavy Shield
Talent Abbr: armor
Start Level: 10
End Level: 100
Armor ID: 6
```


## Terms of Use

This plugin can be used in commercial or non-commercial projects.  Credit Frogboy in your work.


## Changelog
* Version 1.0 - Initial release
* Version 1.1 - Notifies the player what abilities they'll learn when ranking up
