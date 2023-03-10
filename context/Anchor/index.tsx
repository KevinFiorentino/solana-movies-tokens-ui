import { createContext, useContext } from "react"
import { Program, AnchorProvider, Idl, setProvider } from "@project-serum/anchor"
import idl from "./solana_movies_tokens.json"
import { SolanaMoviesTokens } from "./solana_movies_tokens"
import { Connection, PublicKey } from "@solana/web3.js"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import MockWallet from "./MockWallet"

const WorkspaceContext = createContext({})
const programId = new PublicKey(idl.metadata.address)

interface WorkSpace {
  connection?: Connection
  provider?: AnchorProvider
  program?: Program<SolanaMoviesTokens>
}

const WorkspaceProvider = ({ children }: any) => {
  const wallet = useAnchorWallet() || MockWallet
  const { connection } = useConnection()

  const provider = new AnchorProvider(connection, wallet, {})

  setProvider(provider)
  const program = new Program(
    idl as Idl,
    programId
  ) as unknown as Program<SolanaMoviesTokens>
  const workspace = {
    connection,
    provider,
    program,
  }

  return (
    <WorkspaceContext.Provider value={workspace}>
      {children}
    </WorkspaceContext.Provider>
  )
}

const useWorkspace = (): WorkSpace => {
  return useContext(WorkspaceContext)
}

export { WorkspaceProvider, useWorkspace }
