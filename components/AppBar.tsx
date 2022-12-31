import { FC } from 'react'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'

export const AppBar: FC = () => {
  return (
    <div className={styles.AppHeader}>
      <Image src="/solanaLogo.png" height={30} width={200} />
      <span className="solana-text-gradient" style={{ fontWeight: 800, }}>
        Movie Reviews
      </span>
      <WalletMultiButton />
    </div>
  )
}
