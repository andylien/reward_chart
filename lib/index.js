/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('ask-sdk');

const APP_ID = 'amzn1.ask.skill.58458007-7fc2-45b4-a3c6-8a32737699cb';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the Alexa Skills Kit, Natalie is here!';

        return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).withSimpleCard('Hello World', speechText).getResponse();
    }
};

const AddPrizeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AddPrizeIntent';
    },
    handle(handlerInput) {
        console.log('In add prize intent');

        let intent = handlerInput.requestEnvelope.request.intent;
        console.log('slots: ' + JSON.stringify(intent.slots));

        // Handle dialogState
        let dialogState = handlerInput.requestEnvelope.request.dialogState;
        if (dialogState !== 'COMPLETED') {
            return handlerInput.responseBuilder.addDelegateDirective(intent).getResponse();
        }

        let points = intent.slots.points.value;
        let prize = intent.slots.prize.value;

        const speechText = 'Okay. I added ' + prize + ' to the list of prizes for ' + points + ' points.';

        return handlerInput.responseBuilder.speak(speechText).withSimpleCard('Hello World', speechText).getResponse();
    }
};

const AddPointsIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AddPointsIntent';
    },
    handle(handlerInput) {
        //console.log(`REQUEST++++${JSON.stringify(handlerInput)}`);

        let intent = handlerInput.requestEnvelope.request.intent;
        console.log(`intent: ${JSON.stringify(intent)}`);

        // Handle dialogState
        let dialogState = handlerInput.requestEnvelope.request.dialogState;
        if (dialogState !== 'COMPLETED') {
            return handlerInput.responseBuilder.addDelegateDirective(intent).getResponse();
        }

        // Validate slots
        //if (!intent.slots.person) {
        //  return handlerInput.responseBuilder
        //    .
        //}
        let points = intent.slots.points.value;
        let person = intent.slots.person.value;
        let activity = intent.slots.activity.value;

        let points_txt = 'point';
        if (points == undefined) {
            points = 1;
        }
        if (points !== 1) {
            points_txt = 'points';
        }
        const speechText = 'Okay. I gave ' + person + ' ' + points + ' ' + points_txt + ' for ' + activity;

        return handlerInput.responseBuilder.speak(speechText).withSimpleCard('Hello World', speechText).getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me!';

        return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).withSimpleCard('Hello World', speechText).getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder.speak(speechText).withSimpleCard('Hello World', speechText).getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder.speak('Sorry, I can\'t understand the command. Please say again.').reprompt('Sorry, I can\'t understand the command. Please say again.').getResponse();
    }
};

let skill;

exports.handler = async function (event, context) {
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        skill = Alexa.SkillBuilders.custom().addRequestHandlers(LaunchRequestHandler, AddPointsIntentHandler, AddPrizeIntentHandler, HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler).addErrorHandlers(ErrorHandler).create();
    }

    return skill.invoke(event, context);
};