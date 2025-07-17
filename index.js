import Head from 'next/head'
import AviatorBot from '../components/AviatorBot'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Aviator Predictor</title>
      </Head>
      <main>
        <AviatorBot />
      </main>
    </div>
  )
}
