import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import path from 'path'

const typeGraphQl = fileLoader(path.join(__dirname, 'modules', '**', '*.graphql'))
const typeGql = fileLoader(path.join(__dirname, 'modules', '**', '*.gql'))

const typeArray = [ ...typeGraphQl, ...typeGql ]

const typeDefs = mergeTypes(typeArray)

export default typeDefs
