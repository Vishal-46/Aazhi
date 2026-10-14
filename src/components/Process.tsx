import Reveal from './Reveal';

const steps = [
  {
    n: '01',
    title: 'Understand the problem',
    body: 'We start with the people doing the work and map how things actually run.',
  },
  {
    n: '02',
    title: 'Define the solution',
    body: 'We agree on the smallest useful thing to build before writing any code.',
  },
  {
    n: '03',
    title: 'Design and build',
    body: 'We design and build a clear, maintainable first version — no theatre.',
  },
  {
    n: '04',
    title: 'Test, refine, deliver',
    body: 'We test with real use, refine what breaks, and hand over something that works.',
  },
];

export default function Process() {
  return (
    <section id="process" className="wk-process" aria-labelledby="process-title">
      <div className="wk-wrap">
        <Reveal>
          <div className="wk-head">
            <p className="wk-eyebrow">How we work</p>
            <h2 className="wk-title" id="process-title">
              How we work.
            </h2>
            <p className="wk-lede">A simple sequence, followed carefully on every project.</p>
          </div>
        </Reveal>
        <ol className="wk-steps" aria-label="Our process">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 60} variant="up" className="wk-step">
              <span className="wk-step__num" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="wk-step__title">{s.title}</h3>
              <p className="wk-step__body">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
