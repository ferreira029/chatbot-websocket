import { gql } from '@apollo/client'

export const GET_MESSAGES_REALTIME = gql`
subscription {
  messages {
    id content user
  }
}`

export const IS_TYPING = gql`
subscription {
  isTyping {
    user isTyping
  }
}`
