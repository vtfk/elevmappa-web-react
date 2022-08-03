import { Heading2, Heading3, Heading4, Paragraph } from '@vtfk/components'
import './style.scss'

const QuestionBlock = ({ question, children }) => {
  return (
    <div className='help-question-block'>
      <Heading4 className='help-section-question'>
        {question}
      </Heading4>

      <Paragraph className='help-text-block'>
        {children}
      </Paragraph>
    </div>
  )
}

export function Help () {
  return (
    <div className='help-page'>
      <Heading2 as='h1' className='title'>
        Spørsmål og svar
      </Heading2>

      <p>Nedenfor finner du ofte stilte spørsmål og svar.</p>
      <p>Feil, mangler og ønsker kan du sende til <a href='mailto:post.opplaring@vtfk.no' title='Send e-post til post.opplaring@vtfk.no'>post.opplaring@vtfk.no</a></p>

      <Heading3 as='h2'>
        Om elevmappa
      </Heading3>

      <p>
        Elevmappa gir deg mulighet til å søke opp elevene du er kontakt- og faglærer for.<br />
        I elevmappene vil du finne dokumenter som tilhører eleven.
      </p>

      <p>
        På forsiden velger du en elev ved å trykke på navnet i listen.
        Når du har trykket på navnet til eleven får du se dokumentene du har leserettigheter til som lærer.
      </p>

      <Heading3 as='h2'>
        Spørsmål
      </Heading3>

      <QuestionBlock question='Jeg finner ikke eleven jeg leter etter'>
        Finner du ikke eleven du leter etter, ta kontakt med den som er ansvarlig for Visma InSchool eller administrativt personale på din skole.
      </QuestionBlock>

      <QuestionBlock question='Jeg mangler leserettigheter til et dokument jeg mener jeg bør lese'>
        Ta kontakt med din nærmeste leder som vil undersøke om du har rett til innsyn i dokumentet.
      </QuestionBlock>

      <QuestionBlock question='Jeg får melding om "Finner ikke elevmappe. Kontakt arkivet"'>
        Ta kontakt med arkivet på e-post <a href='mailto:7013@vtfk.no' title='Send e-post til 7013@vtfk.no'>7013@vtfk.no</a> eller tlf. 35 91 70 13
      </QuestionBlock>
    </div>
  )
}
