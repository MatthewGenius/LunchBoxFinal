/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'lunchbox';
const GET_FACT_MESSAGE = "Here's your recipe. If its too fast please say stop while I'm talking: ";
const HELP_MESSAGE = 'You can say tell me a recipe, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'I would reccomend you Serendipity Bread. It may take a while. To make it, prepare 11/4 cups water, 2 tablespoons butter, 2 tablespoons white sugar, 2 tablespoons milk powder, 11/2 teaspoons salt, 31/3 cups bread flour, 11/2 teaspoons active dry yeast, 2 tablespoons olive oil, 2 teaspoons garlic powder (optional), 4 ounces crumbled feta cheese (optional). Then, place the first set of ingredients into the pan of the bread machine in the order recommended by the manufacturer. Select DOUGH cycle; press START. Do not put in the olive oil, garlic powder or feta cheese. Then, preheat an outdoor grill for medium heat. When the cycle has ended, turn the dough out onto a lightly floured surface, and divide into 2 halves. Roll each half out into a circle that is about 9 or 10 inches across. Brush the top of each circle with olive oil. Place the bread circles oil side down onto the grill. Brush the other side with olive oil, and watch carefully. When the bottom side is browned, turn over the bread, and grill the other side until golden. If desired, sprinkle with garlic powder and feta cheese. Now, its time to taste your food! Good Luck!',
    'I would reccomend you Blueberry Zucchini Bread. It may take a while. To make it, prepare 3 eggs, lightly beaten1 cup vegetable oil, 3 teaspoons vanilla extract, 21/4 cups white sugar, 2 cups shredded zucchini, 3 cups all-purpose flour, 1 teaspoon salt1 teaspoon baking powder, 1/4 teaspoon baking soda, 1 tablespoon ground cinnamon, 1 pint fresh blueberries. Then Preheat oven to 350 degrees F (175 degrees C). Lightly grease 4 mini-loaf pans. In a large bowl, beat together the eggs, oil, vanilla, and sugar. Fold in the zucchini. Beat in the flour, salt, baking powder, baking soda, and cinnamon. Gently fold in the blueberries. Transfer to the prepared mini-loaf pans. Bake 50 minutes in the preheated oven, or until a knife inserted in the center of a loaf comes out clean. Cool 20 minutes in pans, then turn out onto wire racks to cool completely. Now it is time to taste your food. Good Luck!',
    'I would reccomend you Fluffy Pancakes. It would take around 10 minutes. To make it, prepare 3/4 cup milk, 2 tablespoons white vinegar, 1 cup all-purpose flour, 2 tablespoons white sugar, 1 teaspoon baking powder, 1/2 teaspoon baking soda, 1/2 teaspoon salt, 1 egg, 2 tablespoons butter, meltedcooking spray. Next, combine milk with vinegar in a medium bowl and set aside for 5 minutes to "sour".Combine flour, sugar, baking powder, baking soda, and salt in a large mixing bowl. Whisk egg and butter into "soured" milk. Pour the flour mixture into the wet ingredients and whisk until lumps are gone. Heat a large skillet over medium heat, and coat with cooking spray. Pour 1/4 cupfuls of batter onto the skillet, and cook until bubbles appear on the surface. Flip with a spatula, and cook until browned on the other side. Now its time to taste your food. Good Luck!',
    'I would reccomend you Health Nut Blueberry Muffins. You would need around 15 minutes. To make it, prepare 3/4 cup all-purpose flour, 3/4 cup whole wheat flour, 3/4 cup white sugar, 1/4 cup oat bran, 1/4 cup quick cooking oats, 1/4 cup wheat germ1 teaspoon baking powder, 1 teaspoon baking soda, 1/4 teaspoon salt1 cup blueberries, 1/2 cup chopped walnuts, 1 banana mashed, 1 cup buttermilk, 1 egg, 1 tablespoon vegetable oil, 1 teaspoon vanilla extract. Then, preheat the oven to 350 degrees F (175 degrees C). Grease a 12 cup muffin pan, or line with paper muffin cups.In a large bowl, stir together the all-purpose flour, whole wheat flour, sugar, oat bran, quick-cooking oats, wheat germ, baking powder, baking soda and salt. Gently stir in the blueberries and walnuts. In a separate bowl, mix together the mashed banana, buttermilk, egg, oil and vanilla. Pour the wet ingredients into the dry, and mix just until blended. Spoon into muffin cups, filling all the way to the top. Bake for 15 to 18 minutes in the preheated oven, or until the tops of the muffins spring back when lightly touched. Now its time to taste your food! Good Luck!',
    'I would reccomend you to eat energy bars. If you want other foods ask me again! Enjoy your food!',
    'I would reccomend you to eat cookies with milk. They would help you to make you feel full. Enjoy your food!',
    'I would reccomend you to eat bread with tomato sauce. To make it, rip a bread and dip it into a plate of tomato sauce. Enjoy your food!',
    'I would reccomend you to eat eggs with salt or potatos with sugar. It would make you feel better or good if you are hungry. Enjoy your food!',
    'I would reccomend you to eat Deep-Fried Lasagna Pieces. It would take around 23 minutes. To make it, prepare 1 pound ground beef, 1 pound ground Italian sausage, 1 (8 ounce) package manicotti shells, 1 (24 ounce) carton cottage cheese drained, 2 (16 ounce) jars pizza sauce divided, 1 (8 ounce) package shredded mozzarella cheese, vegetable oil for frying, 1/2 cup all-purpose flour, 3 eggs, 2 cups bread crumbs. Next, Heat a large skillet over medium heat. Add beef and Italian sausage; cook and stir until browned, about 8 minutes. Drain excess grease. Let cool slightly. Bring a large pot of lightly salted water to a boil. Cook manicotti shells in the boiling water, stirring occasionally until tender yet firm to the bite, about 7 minutes. Drain. Mix cooled beef and sausage, cottage cheese, 1 jar pizza sauce, and mozzarella cheese together in a large bowl. Stuff shells generously with mixture. Arrange stuffed shells on a baking sheet and freeze until firm, 15 to 20 minutes. Cut each shell into 2 or 3 lasagna pieces. Heat oil in a deep-fryer or large saucepan to 350 degrees F (175 degrees C). Place flour in a bowl. Beat eggs in another bowl. Pour bread crumbs onto a shallow plate. Dredge stuffed lasagna pieces in flour. Dip in beaten eggs. Roll in bread crumbs until coated. Fry 4 breaded lasagna pieces at a time in the hot oil until golden brown, 3 to 5 minutes. Repeat with remaining pieces. Pour remaining jar of pizza sauce into a bowl for dipping.',
    'I would reccomend you to eat Italian Anisette Cookies. To make it, prepare 4 cups all-purpose flour, 1 cup white sugar, 1/2 cup milk, 2 eggs, 1 tablespoon baking powder, 3/4 cup vegetable oil, 1 tablespoon anise extract, 1 teaspoon anise extract, 1 cup confectioners sugar, 2 tablespoons hot water. Then, Preheat oven to 375 degrees F (190 degrees C). In large bowl, mix flour, baking powder and white sugar. Make a well in the center and add oil, milk, 1 tablespoon anise extract, and eggs. Mix together until dough is sticky. Oil fingers and pinch off dough in 1 inch pieces. Roll into a ball and place on a lightly greased cookie sheet, 1 inch apart, flatten top slightly. Bake for 8 minutes. Dip cookies in Icing while warm. To Make Icing: Blend in 1 teaspoon anise extract and enough hot water to 1 cup confectioners sugar to form a smooth icing. Now its time to taste your cookies. I wish you would enjoy it! '
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
