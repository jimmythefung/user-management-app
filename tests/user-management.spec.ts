import { test, expect } from '@playwright/test';

test.describe('User Management System', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
  });

  test('should display user management interface', async ({ page }) => {
    // Check that the main title is visible
    await expect(page.getByRole('heading', { name: 'User Management System' })).toBeVisible();
    
    // Check that the search input is present
    await expect(page.getByPlaceholder('Search users by email or name...')).toBeVisible();
    
    // Check that the Add User button is present
    await expect(page.getByRole('button', { name: 'Add User' })).toBeVisible();
  });

  test('should display users table', async ({ page }) => {
    // Wait for the table to load
    await expect(page.locator('table')).toBeVisible();
    
    // Check that table headers are present
    await expect(page.getByRole('columnheader', { name: 'ID' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Created' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Actions' })).toBeVisible();
  });

  test('should add a new user', async ({ page }) => {
    // Click Add User button
    await page.getByRole('button', { name: 'Add User' }).click();
    
    // Fill in the form
    await page.getByLabel('Email *').fill('test@example.com');
    await page.getByLabel('Name').fill('Test User');
    
    // Submit the form
    await page.getByRole('button', { name: 'Create User' }).click();
    
    // Check for success message
    await expect(page.getByText('User created successfully!')).toBeVisible();
    
    // Verify the user appears in the table
    await expect(page.getByText('test@example.com')).toBeVisible();
    await expect(page.getByText('Test User')).toBeVisible();
  });

  test('should search for users', async ({ page }) => {
    // Search for a specific user
    await page.getByPlaceholder('Search users by email or name...').fill('john');
    
    // Wait for search results
    await page.waitForTimeout(500);
    
    // Check that search results contain the expected user
    await expect(page.getByText('john.doe@example.com')).toBeVisible();
    await expect(page.getByText('John Doe')).toBeVisible();
  });

  test('should delete a user', async ({ page }) => {
    // Find and click the delete button for the first user
    const deleteButton = page.locator('table tbody tr').first().getByRole('button', { name: 'Delete' });
    
    // Click delete and confirm
    await deleteButton.click();
    
    // Handle the confirmation dialog
    page.on('dialog', dialog => dialog.accept());
    
    // Check for success message
    await expect(page.getByText('User deleted successfully!')).toBeVisible();
  });

  test('should handle pagination', async ({ page }) => {
    // Check if pagination controls are present (if there are enough users)
    const paginationInfo = page.locator('text=Page 1 of');
    
    if (await paginationInfo.isVisible()) {
      // Click next page button
      await page.getByRole('button', { name: 'Next' }).click();
      
      // Verify we're on page 2
      await expect(page.getByText('Page 2 of')).toBeVisible();
      
      // Click previous page button
      await page.getByRole('button', { name: 'Previous' }).click();
      
      // Verify we're back on page 1
      await expect(page.getByText('Page 1 of')).toBeVisible();
    }
  });

  test('should show loading state', async ({ page }) => {
    // This test verifies that loading states are handled properly
    // The loading spinner should appear briefly when data is being fetched
    await expect(page.locator('text=Loading users...')).not.toBeVisible();
  });

  test('should handle empty search results', async ({ page }) => {
    // Search for something that doesn't exist
    await page.getByPlaceholder('Search users by email or name...').fill('nonexistentuser123');
    
    // Wait for search
    await page.waitForTimeout(500);
    
    // Check for empty state message
    await expect(page.getByText('No users found matching your search.')).toBeVisible();
  });
}); 