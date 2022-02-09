import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Input, Button } from 'reactstrap'
import { POST_MESSAGE } from '../../api/mutations/messages'
import { GET_MESSAGES } from '../../api/queries/messages'
import { GET_MESSAGES_REALTIME } from '../../api/subscriptions/messages'
import Messages from '../../components/Messages'

type MessageVars = {
	user: String
	content: String
}

type Message = {
	id: String
	user: String
	content: String[]
}

export type MessagesData = {
	messages: Message[]
}


const Chatbot = () => {
	const [user, setUser] = useState('Marc')
	const [content, setContent] = useState('')
	
	const [allMessages, setAllMessages] = useState([])

	const { data: oldMessages } = useQuery<MessagesData>(GET_MESSAGES)
	const { data } = useSubscription<MessagesData>(GET_MESSAGES_REALTIME)

	useEffect(() => {
		const messages = data?.messages ? data?.messages : []
		const oldMessagesData = oldMessages?.messages ? oldMessages.messages : []
		setAllMessages([...oldMessagesData, ...messages])
	}, [data, oldMessages])

	const [postMessage] = useMutation<{ id: String }, MessageVars>(POST_MESSAGE)

	const onSend = () => {
		if (content.length > 0) {
      postMessage({
        variables: { user, content },
      })
			setContent('')
		}
	}


	return (
		<Container className="mt-3" style={{ maxWidth: '40%', }}>
			<Row style={{ maxHeight: '450px', overflow: 'auto' }}>
				<Col lg={12}>
					<Messages user={user} allMessages={allMessages} />
				</Col>
			</Row>
			<Row>
				<Col lg={2}>
					<Input value={user} onChange={evt => setUser(evt.target.value)} />
				</Col>
				<Col lg={6}>
					<Input
						value={content}
						onChange={evt => setContent(evt.target.value)}
						onKeyUp={evt => evt.key === 'Enter' && onSend()}
					/>
				</Col>
				<Col lg={4}>
					<Button onClick={onSend}>Enviar</Button>
				</Col>
			</Row>
		</Container>
	)
}

export default Chatbot
