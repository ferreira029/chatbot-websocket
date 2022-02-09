import { v4 as uuidv4 } from 'uuid'
import { IS_TYPING, SEND_MESSAGE } from './channels'

const messages = [
	{
		id: '0',
		user: 'Amanda',
		content: ['Olá tudo bem?', 'Mensagem 2 - Qual seu nome?'],
		nextId: '1',
	},
	{
		id: '1',
		user: 'Amanda',
		content: ['Mensagem 3 - Qual seu nome?'],
		nextId: '2',
	},
	{
		id: '2',
		user: 'Amanda',
		content: ['Mensagem 4 - Qual seu nome?'],
		nextId: '3',
	},
	{
		id: '3',
		user: 'Amanda',
		content: ['Mensagem 5 - Qual seu nome?'],
		nextId: '4',
	},
	{
		id: '4',
		user: 'Amanda',
		content: ['Mensagem 6 - Qual seu nome?'],
		nextId: '5',
	},
	{
		id: '5',
		user: 'Amanda',
		content: ['Mensagem 7 - Qual seu nome?'],
		nextId: '6',
	},
	{
		id: '6',
		user: 'Amanda',
		content: ['Mensagem 8 - Qual seu nome?'],
		nextId: null,
	},
]

const answers = []

export default {
	Query: {
		messages: () => {
			return [messages[0]]
		},
	},
	Mutation: {
		postMessage: (parent, { data: { user, content } }, { pubsub }) => {
			const id = uuidv4()
			messages.shift()
			if (messages.length > 1) {
				pubsub.publish(SEND_MESSAGE, { messages: answers })
				answers.push({ id, user, content })
				answers.push(messages[0])
			} else if (messages.length === 1) {
				pubsub.publish(SEND_MESSAGE, { messages: answers })
				answers.push({ id, user, content })
				answers.push(messages[0])
				answers.push({ id: uuidv4(), user: 'Amanda', content: ['Conversa finalizada!!!'] })
			}
			return id
		},
		changeIsTyping: (parent, { data }, { pubsub }) => {
			pubsub.publish(IS_TYPING, { isTyping: { user: data.user, isTyping: data.isTyping } })
			return data.isTyping
		},
	},
	Subscription: {
		messages: {
			subscribe: (parent, args, { pubsub }) => {
				return pubsub.asyncIterator(SEND_MESSAGE)
			},
		},
		isTyping: {
			subscribe: (parent, args, { pubsub }) => {
				return pubsub.asyncIterator(IS_TYPING)
			},
		},
	},
}
