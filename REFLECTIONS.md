# Four short reflections — Assignment 2

**Student:** Asish Anisetti (N01738397)

### 1. How does user state move from login response to the Navbar without passing props through multiple layers?

The Login form calls `login()` from `AuthContext`. That method sends the credentials to `/api/auth/login`, receives safe user information, and calls `setUser(data.user)`. Because the Navbar reads `useAuth()`, React automatically rerenders it with the user's name and Logout button. After a refresh, the provider calls `/api/auth/me` using the HttpOnly session cookie to restore the user state.

### 2. When a heart button is clicked, how do the API, FavoritesContext and Atlas each contribute?

The button receives an artwork ID as a prop and calls the shared favourites provider. The provider sends POST or DELETE to a protected API route. The route identifies the user from the server-verified session and writes the user's favourite to MongoDB Atlas. The provider then fetches the updated list, causing the button and Navbar count to rerender.

### 3. What makes a saved favourite persistent even though Context resets on a full page reload?

Context only holds the current browser view of favourites. The records are stored in MongoDB Atlas with the authenticated user ID and artwork ID. When the page reloads and AuthContext restores the session, FavoritesProvider fetches the saved records from the backend again.

### 4. Why do both frontend role-aware UI and backend authorization checks exist?

Hiding the Admin link helps ordinary users avoid navigation they cannot use, but it does not secure the API. Anyone can type the URL or send an HTTP request directly. The backend must check the verified session and role, returning 401 to guests and 403 to non-admin users; only administrators receive the redacted account list.

*Review and adapt these explanations to your own understanding before submission.*
