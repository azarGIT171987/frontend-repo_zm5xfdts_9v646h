import React from 'react'

const Etiquette = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-emerald-900/20 rounded-3xl p-8 sm:p-12 border border-emerald-900/10 dark:border-emerald-100/10 shadow-sm">
        <h1 className="font-serif text-4xl text-emerald-900 dark:text-emerald-50">Naming Etiquette in Islam</h1>
        <p className="mt-4 text-emerald-900/80 dark:text-emerald-100/80">Choosing a name is a meaningful act. The tradition encourages beautiful meanings and avoidance of names with problematic implications.</p>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-emerald-900 dark:text-emerald-50">Praiseworthy Names</h2>
          <ul className="list-disc pl-6 mt-2 text-emerald-900/80 dark:text-emerald-100/80 space-y-1">
            <li>Names that carry virtuous meanings like faith, gratitude, or patience.</li>
            <li>Names of Prophets and righteous figures.</li>
            <li>Names that are easy to pronounce and pleasant to hear.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-serif text-2xl text-emerald-900 dark:text-emerald-50">Forbidden Names</h2>
          <ul className="list-disc pl-6 mt-2 text-emerald-900/80 dark:text-emerald-100/80 space-y-1">
            <li>Names that imply lordship or divinity other than Allah.</li>
            <li>Names that carry arrogant or obscene meanings.</li>
            <li>Names of false deities.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-serif text-2xl text-emerald-900 dark:text-emerald-50">Makruh (Disliked) Names</h2>
          <ul className="list-disc pl-6 mt-2 text-emerald-900/80 dark:text-emerald-100/80 space-y-1">
            <li>Names with excessively harsh meanings.</li>
            <li>Names that cause embarrassment or ridicule.</li>
            <li>Overly complicated or contrived names that create hardship.</li>
          </ul>
        </section>

        <p className="mt-10 text-emerald-900/70 dark:text-emerald-100/70 italic">Consult local scholars and family traditions for nuances. The intention should be beauty, meaning, and ease.</p>
      </div>
    </div>
  )
}

export default Etiquette
