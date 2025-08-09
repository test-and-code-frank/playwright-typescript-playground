import { test, expect } from '@playwright/test';

test('GET /posts returns a list of posts', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');

    // Check the response status
    expect(response.status()).toBe(200);

    // Parse JSON response body
    const data = await response.json();

    // Expect it to be an array with at least 1 item
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    // Optional: check structure of first item
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('body');
});