### Countries Search App

This is a React and TypeScript application that allows users to search for countries, view details about them and nearby destinations

## Technologies used

- React
- TypeScript
- Next.js (for building API endpoints)
- Chakra UI (styling and accessibility)
- Downshift (combobox)
- React-Query (API data fetching and caching)
- usehooks (useDebounce was used to debounce the input)


## Developer Notes
This application was built with several key considerations in mind to ensure a seamless user experience and efficient data handling:

**Accessibility**: Accessibility is a fundamental aspect of the application's design. Chakra UI for our user interface, which comes with built-in accessibility features to ensure that the app is usable by a wide range of people, including those with disabilities.

**Realistic Data Handling**: To simulate real API calls, I've implemented Next.js API endpoints with a small delay. This approach allows for mimicking the behavior of actual API requests while maintaining the efficiency of local development.

**Data Fetching and Caching**: For fetching and caching data, React Query has been integrated, enhancing data management with powerful tools for fetching, caching, synchronizing, and updating data from the server. This ensures that the application remains up-to-date with the latest data.

**Responsiveness**: The application is designed to be responsive, adapting to different screen sizes and devices. Whether you're using it on a desktop, tablet, or mobile device, you can expect a consistent and user-friendly experience.

## Deployment

The Password Validator app is deployed and accessible online. You can try it out by visiting the following link:

[Countries Search App](https://mozio-takehome.vercel.app/)

### Deployment Details

The app is deployed using [Vercel](https://vercel.com/), a popular platform for hosting web applications.
