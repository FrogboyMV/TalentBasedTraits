//=============================================================================
// Frogboy RMMV Plugin
// FROG_TalentBasedTraits.js
//=============================================================================

var Imported = Imported || {};
Imported.FROG_LevelBasedTraitsTalent = true;

var FROG = FROG || {};
FROG.TBT = FROG.TBT || {};

/*:
 * @plugindesc v1.1 Add traits as characters advance their rank in a talent
 * @author Frogboy
 *
 * @help
 * Talent Based Traits v1.1
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to grant your actors talent-based traits.  You will
 * need to also install the FROG_TalentCore plugin to utilize this
 * functionality.  What this means is that as your players build up their
 * actor’s Traits, your game can add new abilities and bonuses to said actors
 * based on their talent level.  This is useful for creating RPG systems that
 * allow the player to customize their characters however they want as opposed
 * to everything being determined by the character’s class.
 *
 * Here are few examples of what you can easily implement with this plugin as
 * your characters advance their talents.
 *     Adjust Elemental Resistance
 *     Increase Hit%, Critical% and/or Evade%
 *     Resist status ailments better
 *     Gain immunity to Poison and/or Disease
 *     Gain Extra Attacks
 *     Reduce Floor Damage
 *     Gain a chance to Poison or Blind when attacking
 *     Gain addition Skill Types
 *     Gain new weapon and armor proficiencies
 *     No longer risk being surprised during encounters
 *
 * So for instance, say you've created a Talent called Armor Proficiency.  You
 * can use this plugin to grant better classes of armor as they apply more
 * ranks to this talent.  All characters would start out with something like
 * Simple Armor which would probably just be Cloth but as they add ranks, they
 * would gain access to Light Armor, then Medium Armor and finally Heavy Armor,
 * or whatever progression you wanted for your game that fits your armor types.
 * The same could be done for weapons, skills, resistances or anything else
 * that can be done with Traits.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * Install this plugin as well as the FROG_TalentCore plugin.  Configure your
 * Talents within the FROG_Talents plugin and then configure this one to grant
 * Traits to any actor who spends their Talent points in certain areas.
 *
 * Description - This is text that you’ll want to enter so that you’ll know
 * what that particular talent-based trait is.
 *
 * Name - When a player is adding ranks in the Talents screen, this text will
 * display to let them know what new ability they will learn if they advance
 * their talent to this level.
 *
 * Talent Abbr - Enter in the Talent Abbreviation that you set up in the
 * FROG_TalentCore plugin.
 *
 * Start Level - This is the talent level/score that the actor this trait.
 *
 * End Level - This is the talent level/score that this trait will expire.
 * Because of the way MV stacks traits, it’s often times better to remove one
 * and then replace it with a better version. Otherwise, newer version will be
 * combined and produce harder to manage results.
 *
 * Trait-specific Parameters - There will always be one or two parameters that
 * you will fill in just as you would in the editor itself. Most of the time,
 * you’ll be able to select easy to understand options from drop-down lists
 * like “Encounter Half” for Party Ability. The exception to this are your
 * custom Types in the database. For whatever reason, the 1.5 plugin parameters
 * don’t have an option to generate a select list from these so you have to
 * enter in the ID until this oversight is remedied.
 *
 * Example:
 *
 * I want to advance a character's armor proficiency for every 2 ranks in the
 * Armor Proficiency Talent.  Let's say you have your armor types set up like
 * this.
 *
 * 01 Simple Armor (Everyone gets this)
 * 02 Light Armor
 * 03 Light Shield
 * 04 Medium Armor
 * 05 Heavy Armor
 * 06 Heavy Shield
 *
 * Under Talent-based -> Equip -> Equip Armor, enter in these parameter values.
 *
 * Description: Light Armor
 * Talent Abbr: armor (this is what you set the abbr to in your Talent)
 * Start Level: 2
 * End Level: 100
 * Armor ID: 2
 *
 * Description: Light Shield
 * Talent Abbr: armor
 * Start Level: 4
 * End Level: 100
 * Armor ID: 3
 *
 * Description: Medium Armor
 * Talent Abbr: armor
 * Start Level: 6
 * End Level: 100
 * Armor ID: 4
 *
 * Description: Heavy Armor
 * Talent Abbr: armor
 * Start Level: 8
 * End Level: 100
 * Armor ID: 5
 *
 * Description: Heavy Shield
 * Talent Abbr: armor
 * Start Level: 10
 * End Level: 100
 * Armor ID: 6
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * This plugin can be used in commercial or non-commercial projects.
 * Credit Frogboy in your work
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0 - Initial release
 * Version 1.1 - Notifies the player what ability they'll learn when ranking up
 *
 * ============================================================================
 *
 * @param Talent Based Traits
 * @param Rate
 * @parent Talent Based Traits
 * @param Param
 * @parent Talent Based Traits
 * @param Attack
 * @parent Talent Based Traits
 * @param Skill
 * @parent Talent Based Traits
 * @param Equip
 * @parent Talent Based Traits
 * @param Other
 * @parent Talent Based Traits
 *
 *
 * @param Element Rate
 * @parent Rate
 * @type struct<talentElementStruct>[]
 * @desc Add a Element Rate when a talent is raised to a specific rank.
 * @default []
 *
 * @param Debuff Rate
 * @parent Rate
 * @type struct<talentDebuffStruct>[]
 * @desc Add a Debuff Rate when a talent is raised to a specific rank.
 * @default []
 *
 * @param State Rate
 * @parent Rate
 * @type struct<talentStateRateStruct>[]
 * @desc Add a State Rate when a talent is raised to a specific rank.
 * @default []
 *
 * @param State Resist
 * @parent Rate
 * @type struct<talentStateResistStruct>[]
 * @desc Add a State Immunity when a talent is raised to a specific rank.
 * @default []
 *
 * @param Parameter
 * @parent Param
 * @type struct<talentParameterStruct>[]
 * @desc Add a Parameter when a talent is raised to a specific rank.
 * @default []
 *
 * @param Ex-Parameter
 * @parent Param
 * @type struct<talentExParameterStruct>[]
 * @desc Add an Ex-Parameter when a talent is raised to a specific rank.
 * @default []
 *
 * @param Sp-Parameter
 * @parent Param
 * @type struct<talentSpParameterStruct>[]
 * @desc Add a Sp-Parameter when a talent is raised to a specific rank.
 * @default []
 *
 * @param Attack Element
 * @parent Attack
 * @type struct<talentAttackElementStruct>[]
 * @desc Add Attack Element when a talent is raised to a specific rank.
 * @default []
 *
 * @param Attack State
 * @parent Attack
 * @type struct<talentAttackStateStruct>[]
 * @desc Add Attack State when a talent is raised to a specific rank.
 * @default []
 *
 * @param Attack Speed
 * @parent Attack
 * @type struct<talentAttackSpeedStruct>[]
 * @desc Add Attack Speed when a talent is raised to a specific rank.
 * @default []
 *
 * @param Extra Attacks
 * @parent Attack
 * @type struct<talentExtraAttacksStruct>[]
 * @desc Add Extra Attacks when a talent is raised to a specific rank.
 * @default []
 *
 * @param Add Skill Type
 * @parent Skill
 * @type struct<talentAddSkillTypeStruct>[]
 * @desc Add a Skill Type when a talent is raised to a specific rank.
 * @default []
 *
 * @param Seal Skill Type
 * @parent Skill
 * @type struct<talentAddSkillTypeStruct>[]
 * @desc Seal a Skill Type when a talent is raised to a specific rank.
 * @default []
 *
 * @param Add Skill
 * @parent Skill
 * @type struct<talentAddSkillStruct>[]
 * @desc Add a Skill when a talent is raised to a specific rank.
 * @default []
 *
 * @param Seal Skill
 * @parent Skill
 * @type struct<talentAddSkillStruct>[]
 * @desc Seal a Skill when a talent is raised to a specific rank.
 * @default []
 *
 * @param Equip Weapon
 * @parent Equip
 * @type struct<talentEquipWeaponStruct>[]
 * @desc Add a Weapon Type when a talent is raised to a specific rank.
 * @default []
 *
 * @param Equip Armor
 * @parent Equip
 * @type struct<talentEquipArmorStruct>[]
 * @desc Add an Armor Type when a talent is raised to a specific rank.
 * @default []
 *
 * @param Slot Type
 * @parent Equip
 * @type struct<talentSlotTypeStruct>[]
 * @desc Enable Dual Wield for this talent.
 * @default []
 *
 * @param Action Times
 * @parent Other
 * @type struct<talentActionTimesStruct>[]
 * @desc Increase the probability of taking extra actions in a battle.
 * @default []
 *
 * @param Special Flag
 * @parent Other
 * @type struct<talentSpecialFlagStruct>[]
 * @desc Special states
 * @default []
 *
 * @param Party Ability
 * @parent Other
 * @type struct<talentPartyAbilityStruct>[]
 * @desc Abilities shared by the entire party if any member possesses it.
 * @default []
*/

/* =========================================================================
   TRAIT STRUCTURES
   ========================================================================= */

/*~struct~talentElementStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Element ID
 * @type number
 * @desc The ID of the element as listed in the Types section of the database.
 * @default 1
 * @max 99
 * @min 1
 *
 * @param Percentage
 * @type number
 * @desc Multiplied by this percentage.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~talentDebuffStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Parameter
 * @type select
 * @desc Parameter to adjust.
 * @default 0
 * @option Max HP
 * @value 0
 * @option Max MP
 * @value 1
 * @option Attack
 * @value 2
 * @option Defense
 * @value 3
 * @option Magic Attack
 * @value 4
 * @option Magic Defense
 * @value 5
 * @option Agility
 * @value 6
 * @option Luck
 * @value 7
 *
 * @param Percentage
 * @type number
 * @desc Multiplied by this percentage.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~talentStateRateStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param State
 * @type state
 * @desc The State being adjusted.
 * @default 1
 *
 * @param Percentage
 * @type number
 * @desc Multiplied by this percentage.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~talentStateResistStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param State
 * @type state
 * @desc The State being adjusted.
 * @default 1
 */
/*~struct~talentParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Parameter
 * @type select
 * @desc Parameter to adjust.
 * @default 0
 * @option Max HP
 * @value 0
 * @option Max MP
 * @value 1
 * @option Attack
 * @value 2
 * @option Defense
 * @value 3
 * @option Magic Attack
 * @value 4
 * @option Magic Defense
 * @value 5
 * @option Agility
 * @value 6
 * @option Luck
 * @value 7
 *
 * @param Percentage
 * @type number
 * @desc Multiplied by this percentage.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~talentExParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Ex-Parameter
 * @type select
 * @desc Parameter to adjust.
 * @default 0
 * @option Hit Rate
 * @value 0
 * @option Evasion Rate
 * @value 1
 * @option Critical Rate
 * @value 2
 * @option Critical Evasion
 * @value 3
 * @option Magic Evasion
 * @value 4
 * @option Magic Reflection
 * @value 5
 * @option Counter Attack
 * @value 6
 * @option HP Regeneration
 * @value 7
 * @option MP Regeneration
 * @value 8
 * @option TP Regeneration
 * @value 9
 *
 * @param Percentage
 * @type number
 * @desc This percentage is added to the actor's total.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~talentSpParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Sp-Parameter
 * @type select
 * @desc Parameter to adjust.
 * @default 0
 * @option Target Rate
 * @value 0
 * @option Guard Effect
 * @value 1
 * @option Recovery Effect
 * @value 2
 * @option Pharmacology
 * @value 3
 * @option MP Cost Rate
 * @value 4
 * @option TP Charge Rate
 * @value 5
 * @option Physical Damage
 * @value 6
 * @option Magical Damage
 * @value 7
 * @option Floor Damage
 * @value 8
 * @option Experience
 * @value 9
 *
 * @param Percentage
 * @type number
 * @desc Multiplied by this percentage.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~talentAttackElementStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Element ID
 * @type number
 * @desc The ID of the element as listed in the Types section of the database.
 * @default 1
 * @max 99
 * @min 1
 */
/*~struct~talentAttackStateStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param State
 * @type state
 * @desc State applied as an additional effect to a normal attack.
 * @default 1
 *
 * @param Percentage
 * @type number
 * @desc Percentage chance that state will be added with a normal attack.
 * @default 5
 * @max 1000
 * @min 0
 */
/*~struct~talentAttackSpeedStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Attack Speed
 * @type number
 * @desc Added to agility when determining turn order when normal attack chosen.
 * @default 1
 * @max 1000
 * @min -1000
 */
/*~struct~talentExtraAttacksStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Extra Attacks
 * @type number
 * @desc The number of extra attacks given.
 * @default 1
 * @max 9
 * @min 0
 */
/*~struct~talentAddSkillTypeStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Skill Type ID
 * @type number
 * @desc The Skill Type being added.
 * @default 1
 * @max 99
 * @min 1
 */
/*~struct~talentAddSkillStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Skill ID
 * @type skill
 * @desc The Skill being added.
 * @default 1
 */
/*~struct~talentEquipWeaponStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Weapon ID
 * @type number
 * @desc The ID of the weapon type as listed in the Types section of the database.
 * @default 1
 * @max 99
 * @min 1
 */
/*~struct~talentEquipArmorStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Armor ID
 * @type number
 * @desc The ID of the armor type as listed in the Types section of the database.
 * @default 1
 * @max 99
 * @min 1
 */
/*~struct~talentSlotTypeStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Slot Type
 * @type select
 * @desc Sword and Board or Dual Wield. That is the question.
 * @default 0
 * @option Normal
 * @value 0
 * @option Dual Wield
 * @value 1
 */
/*~struct~talentActionTimesStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Percentage
 * @type number
 * @desc Percentage chance that additional action will be added.
 * @default 100
 * @max 100
 * @min 0
 */
/*~struct~talentSpecialFlagStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Special Flag
 * @type select
 * @desc Grant a special state to an actor with enough talent ranks.
 * @default 0
 * @option Auto Battle
 * @value 0
 * @option Guard
 * @value 1
 * @option Substitute
 * @value 2
 * @option Preserve TP
 * @value 3
 */
/*~struct~talentPartyAbilityStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Name
 * @type string
 * @desc This is used in the help box to let the player know what they're gaining by advancing this Talent.
 *
 * @param Talent Abbr
 * @type string
 * @desc The talent that will gain the trait.
 *
 * @param Start Rank
 * @type number
 * @desc The talent rank that the trait will be acquired.
 * @default 1
 *
 * @param End Rank
 * @type number
 * @desc The talent rank that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Party Ability
 * @type select
 * @desc
 * @default 0
 * @option Encounter Half
 * @value 0
 * @option Encounter None
 * @value 1
 * @option Cancel Surprise
 * @value 2
 * @option Raise Pre-emptive
 * @value 3
 * @option Gold Double
 * @value 4
 * @option Drop Item Double
 * @value 5
 */

(function() {
	FROG.TBT.prm = PluginManager.parameters('FROG_TalentBasedTraits');
	FROG.TBT.elementRate = (FROG.TBT.prm['Element Rate']) ? JSON.parse(FROG.TBT.prm['Element Rate']) : [];
	FROG.TBT.debuffRate = (FROG.TBT.prm['Debuff Rate']) ? JSON.parse(FROG.TBT.prm['Debuff Rate']) : [];
	FROG.TBT.stateRate = (FROG.TBT.prm['State Rate']) ? JSON.parse(FROG.TBT.prm['State Rate']) : [];
	FROG.TBT.stateResist = (FROG.TBT.prm['State Resist']) ? JSON.parse(FROG.TBT.prm['State Resist']) : [];
	FROG.TBT.parameter = (FROG.TBT.prm['Parameter']) ? JSON.parse(FROG.TBT.prm['Parameter']) : [];
	FROG.TBT.exParameter = (FROG.TBT.prm['Ex-Parameter']) ? JSON.parse(FROG.TBT.prm['Ex-Parameter']) : [];
	FROG.TBT.spParameter = (FROG.TBT.prm['Sp-Parameter']) ? JSON.parse(FROG.TBT.prm['Sp-Parameter']) : [];
	FROG.TBT.attackElement = (FROG.TBT.prm['Attack Element']) ? JSON.parse(FROG.TBT.prm['Attack Element']) : [];
	FROG.TBT.attackState = (FROG.TBT.prm['Attack State']) ? JSON.parse(FROG.TBT.prm['Attack State']) : [];
	FROG.TBT.attackSpeed = (FROG.TBT.prm['Attack Speed']) ? JSON.parse(FROG.TBT.prm['Attack Speed']) : [];
	FROG.TBT.extraAttacks = (FROG.TBT.prm['Extra Attacks']) ? JSON.parse(FROG.TBT.prm['Extra Attacks']) : [];
	FROG.TBT.addSkillType = (FROG.TBT.prm['Add Skill Type']) ? JSON.parse(FROG.TBT.prm['Add Skill Type']) : [];
	FROG.TBT.addSkill = (FROG.TBT.prm['Add Skill']) ? JSON.parse(FROG.TBT.prm['Add Skill']) : [];
	FROG.TBT.equipWeapon = (FROG.TBT.prm['Equip Weapon']) ? JSON.parse(FROG.TBT.prm['Equip Weapon']) : [];
	FROG.TBT.equipArmor = (FROG.TBT.prm['Equip Armor']) ? JSON.parse(FROG.TBT.prm['Equip Armor']) : [];
	FROG.TBT.slotType = (FROG.TBT.prm['Slot Type']) ? JSON.parse(FROG.TBT.prm['Slot Type']) : [];
	FROG.TBT.actionTimes = (FROG.TBT.prm['Action Times']) ? JSON.parse(FROG.TBT.prm['Action Times']) : [];
	FROG.TBT.specialFlag = (FROG.TBT.prm['Special Flag']) ? JSON.parse(FROG.TBT.prm['Special Flag']) : [];
	FROG.TBT.partyAbility = (FROG.TBT.prm['Party Ability']) ? JSON.parse(FROG.TBT.prm['Party Ability']) : [];
    if ($dataTalents) $dataTalents.traitRewardsImported = false;

	// Initialize actor properties
	Game_Actor.prototype.initTalentTraits = function() {
		if (this._talentBasedTraits === undefined) this._talentBasedTraits = [];
	}

	// Called everytime the engine checks for traits which is prety much all the time.
	FROG.TBT.Game_Actor_allTraits = Game_Actor.prototype.allTraits;
	Game_Actor.prototype.allTraits = function() {
		FROG.TBT.traits = FROG.TBT.Game_Actor_allTraits.call(this);
		this.initTalentTraits();
		FROG.TBT.traits = FROG.TBT.traits.concat(this._talentBasedTraits);
		return FROG.TBT.traits;
	}

	// Called right after the actors are initialized
    FROG.TBT.Game_Actor_Setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function (actorId) {
        FROG.TBT.Game_Actor_Setup.call(this, actorId);
		this.initTalentTraits();
		this.addTalentTraits();
	}

	/** Assembles all of the level-based traits for this actor
	 * @returns {object} Returns traits to be added to the actor based on level
	 */
	Game_Actor.prototype.addTalentTraits = function () {
		this._talentBasedTraits = [];
		this.addTraitGroupTalent(FROG.TBT.elementRate, 11, "Element ID", "Percentage");
		this.addTraitGroupTalent(FROG.TBT.debuffRate, 12, "Parameter", "Percentage");
		this.addTraitGroupTalent(FROG.TBT.stateRate, 13, "State", "Percentage");
		this.addTraitGroupTalent(FROG.TBT.stateResist, 14, "State", "N/A");
		this.addTraitGroupTalent(FROG.TBT.parameter, 21, "Parameter", "Percentage");
		this.addTraitGroupTalent(FROG.TBT.exParameter, 22, "Ex-Parameter", "Percentage");
		this.addTraitGroupTalent(FROG.TBT.spParameter, 23, "Sp-Parameter", "Percentage");
		this.addTraitGroupTalent(FROG.TBT.attackElement, 31, "Element ID", "N/A");
		this.addTraitGroupTalent(FROG.TBT.attackState, 32, "State", "Percentage");
		this.addTraitGroupTalent(FROG.TBT.attackSpeed, 33, "Attack Speed", "N/A");
		this.addTraitGroupTalent(FROG.TBT.extraAttacks, 34, "N/A", "Extra Attacks");
		this.addTraitGroupTalent(FROG.TBT.addSkillType, 41, "Skill Type ID", "N/A");
		this.addTraitGroupTalent(FROG.TBT.sealSkillType, 42, "Skill Type ID", "N/A");
		this.addTraitGroupTalent(FROG.TBT.addSkill, 43, "Skill ID", "N/A");
		this.addTraitGroupTalent(FROG.TBT.sealSkill, 44, "Skill ID", "N/A");
		this.addTraitGroupTalent(FROG.TBT.equipWeapon, 51, "Weapon ID", "N/A");
		this.addTraitGroupTalent(FROG.TBT.equipArmor, 52, "Armor ID", "N/A");
		this.addTraitGroupTalent(FROG.TBT.slotType, 55, "Slot Type", "N/A");
		this.addTraitGroupTalent(FROG.TBT.actionTimes, 61, "N/A", "Percentage");
		this.addTraitGroupTalent(FROG.TBT.specialFlag, 62, "Special Flag", "N/A");
		this.addTraitGroupTalent(FROG.TBT.partyAbility, 64, "Party Ability", "N/A");
        if ($dataTalents) $dataTalents.traitRewardsImported = true;
	}

	/** Adds traits to an actor
	 * @param {array} traitArray - An array of traits defined in the plugin parameters (required)
	 * @param {number} code - Numeric code that corresponds to a trait (required)
	 * @param {string} dataLbl - The plugin parameter property for the data property
	 * @param {string} valueLbl - The plugin parameter property for the value property
	 */
	Game_Actor.prototype.addTraitGroupTalent = function (traitArray, code, dataLbl, valueLbl) {
		if (traitArray && traitArray.length > 0) {
			for (var i=0; i<traitArray.length; i++) {
				var trait = JSON.parse(traitArray[i]);
				if (!trait["Talent Abbr"] || isNaN(trait["Start Rank"]) || isNaN(trait["End Rank"])) continue;
                var name = trait["Name"] || "";
				var abbr = trait["Talent Abbr"].toLowerCase().trim();
				var startRank = parseInt(trait["Start Rank"]);
				var endRank = parseInt(trait["End Rank"]);
				var dataId = (dataLbl !== "N/A" && isNaN(trait[dataLbl]) == false) ? parseInt(trait[dataLbl]) : 0;
				var value = (valueLbl !== "N/A" && isNaN(trait[valueLbl]) == false) ? parseInt(trait[valueLbl]) : null;
				if (valueLbl == "Percentage" && isNaN(value) == false) {
					value = value / 100;
				}

				for (var j in this._talents) {
					var talent = this._talents[j];
					if (talent.abbr == abbr && talent.ranks >= startRank && talent.ranks < endRank) {
						if (value !== null) {
							this._talentBasedTraits.push({
								code: code,
								dataId: dataId,
								value: value
							});
						}
						else {
							this._talentBasedTraits.push({
								code: code,
								dataId: dataId
							});
						}
					}
				}

                // Import trait rewards for FROG_TalentCore
                if ($dataTalents && !$dataTalents.traitRewardsImported && name && startRank > 0) {
                    if (!$dataTalents.traitRewards) $dataTalents.traitRewards = [];
                    if (!$dataTalents.traitRewards[abbr]) $dataTalents.traitRewards[abbr] = [];

                    $dataTalents.traitRewards[abbr].push({
                        name: name,
                        rank: startRank,
                        end: endRank
                    });
                }
			}
		}
	}
})();
