import Link from 'next/link'
import { FormEvent } from 'react'
import styles from '../styles/Home.module.css'

export default function PageWithJSbasedForm() {
  // Handle the submit event on form submit.
  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Cast the event target to an html form
    const form = event.target as HTMLFormElement

    // Get data from the form.
    const data = {
      stockid: Math.floor(Math.random() * 10000).toString(),
      stockticker: form.stockticker.value as string,
      company: form.company.value as string,
      noofshares: form.noofshares.value as string,
      costbasis: form.costbasis.value as string,
      dividend: form.dividend.value as string,
      amount: form.amount.value as string,
      stockclassification:form.stockclassification.value as string
    }

    // Send the form data to our API and get a response.
    const response = await fetch('https://7lmqkl7jv5.execute-api.us-east-1.amazonaws.com/dev/supportinfo', {
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(data),
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // The method is POST because we are sending data.
      method: 'POST',
    })

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    console.log(response.status)

    console.log(result)
    alert(`Added Successfully :` + response.status)  }
  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
      <label htmlFor="first">Company</label>
        <input type="text" id="company" name="company" required />
        <label htmlFor="first">Stock Ticker</label>
        <input type="text" id="stockticker" name="stockticker" required />
        <label htmlFor="last">Number Of Shares</label>
        <input type="text" id="noofshares" name="noofshares" required />
        <label htmlFor="last">Cost Basis</label>
        <input type="text" id="costbasis" name="costbasis" required />
        <label htmlFor="last">Dividend</label>
        <input type="text" id="dividend" name="dividend" required />
        <label htmlFor="last">Amount</label>
        <input type="text" id="amount" name="amount" required />
        <label htmlFor="last">Stock Classification</label>
        <input type="text" id="stockclassification" name="stockclassification" required />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}