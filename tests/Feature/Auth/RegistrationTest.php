<?php

use App\Models\User;

it('renders the registration screen', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

it('allows new users to register', function () {
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => fake()->unique()->safeEmail(),
        'username' => fake()->unique()->userName(),
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    expect(auth()->check())->toBeTrue();
    $response->assertRedirect(route('dashboard', absolute: false));
});
