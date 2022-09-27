//Lambda

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    
    return handlerInput.responseBuilder
      .speak('¡Hola!... '+HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const DatoCulturaGeneraldHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'DatoCulturaGeneralIntent';
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Se ha terminado la sesión por las siguientes causas: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('<say-as interpret-as="interjection">épale ocurrió un error</say-as>')
      .reprompt('Lo siento, ocurrió un error')
      .getResponse();
  },
};

const SKILL_NAME = 'Datos de Cultura General';
const GET_FACT_MESSAGE = 'Un dato de cultura general es... ';
const HELP_MESSAGE = 'Puedes decirme: Dame un dato de cultura general... o simplemente para detenerme puedes decir: ¡Cancela!... ¿Cómo te puedo ayudar?';
const HELP_REPROMPT = '¿Cómo te puedo ayudar?';
const STOP_MESSAGE = 'Adios y <say-as interpret-as="interjection">gracias por tu preferencia</say-as>';

const data = [
  //TODO agrega tu contenido de datos curiososo aqui... 
  'Los juegos Olimpicos se originaron en Grecia',
  'La La Odisea fue escita por Homero',
  'El ser humano adulto tiene una cantidad de 206 huesos',
  'Elvis Presley fue conocido como el Rey de Rock en los Estados Unidos',
  'Michael Jordan es considerado el mejor jugador de baloncesto de todos los tiempos',
  'Rusia es el país con mayor extensión: 17.075.200 km²',
  'Dentro del sistema solar, el planeta que ocupa el tercer puesto en cuanto a la distancia del sol es la Tierra',
  'Nueva York es conocida como la ciudad de los rascacielos por la altura de sus edificios',
  'El idioma oficial del país más poblado de la tierra es el mandarín',
  'La estación espacial rusa recibe el nombre de Mir',
  'El corán es el libro sagrado de la religión musulmana',
  'Hamlet fue una obra escrita por William Shakespeare que escribió a finales del siglo XVI',
  'La capital de Croacia es Zagreb',
  'Las notas musicales son: Do, re, mi, fa, sol, la, si',
  'El castellano es una lengua que proviene del latín',
  'La primer bomba atómica cayó en Japón, concretamente en Hiroshima',
  'Una célula tiene mayores dimensiones que un átomo',
  'La Universidad de Cambridge es una de las más prestigiosas del mundo y se encuentra en el Reino Unido.',
  'Un ovíparo es un un animal que nace de un huevo.',
  'La capital de la República Francesa es París, la ciudad del amor.',
  'Paco de Lucía es el mejor guitarrista flamenco de todos los tiempos',
  'António Guterres es el secretario general de la ONU en sustitución de Ban Ki Moon',
  'Mark Zuckerberg es el fundador de Facebook',
  'El café es originario de Etiopía, país perteneciente al continente africano',
  'El Reino Unido está formado por las naciones históricas de Inglaterra, Escocia, Gales e Irlanda del Norte',
  'La actriz que posee el mayor número de premios en su haber es Katharine Hepburn, con cuatro estatuillas',
  'El País del Sol Naciente es Japón',
  'Lo que sucede en Las Vegas, se queda en Las Vegas',
  'El director de la película “El Lobo de Wall Street” es el cineasta estadounidense Martin Scorsese',
];

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    DatoCulturaGeneraldHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();