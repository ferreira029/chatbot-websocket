import { gql } from '@apollo/client'

export const POST_MESSAGE = gql`
mutation ($user: String!, $content: [String!]!) {
  postMessage(data: { user: $user, content: $content })
}`

export const CHANGE_IS_TYPING = gql`
mutation ($data: IsTypingInput!) {
  changeIsTyping(data: $data)
}`;
