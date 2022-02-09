const Messages = ({ user, allMessages }) => {
	return (
		<>
			{allMessages.map(({ id, user: messageUser, content }) => (
				<div
					style={{
						display: 'flex',
						justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
						paddingBottom: '1em',
						paddingTop: '1em',
						flexWrap: 'wrap',
						maxWidth: '90%'
					}}
					key={`${id}`}
				>
					{user !== messageUser && (
						<div
							style={{
								height: 50,
								width: 50,
								border: '1px solid #CCCC',
								borderRadius: '50%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: '0.5em',
							}}
						>
							{messageUser.slice(0, 2).toUpperCase()}
						</div>
					)}
					{content?.map((text, idx) => (
						<div
							key={`${idx}${id}`}
							style={{
								background: user === messageUser ? '#58bf56' : '#e5e6ea',
								color: user === messageUser ? '#FFFFFF' : '#000000',
								padding: '1em',
								borderRadius: '1em',
								maxWidth: '60%',
								marginBottom: '0.5em',
								marginLeft: idx > 0 ? 'calc(50px + 0.5em)' : 'unset',
							}}
						>
							{text}
						</div>
					))}
				</div>
			))}
		</>
	)
}

export default Messages
