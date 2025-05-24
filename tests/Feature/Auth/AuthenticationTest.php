<?php

use App\Models\User;

it('renders the login screen', function () {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

it('authenticates users using the login screen', function () {
    $user = User::factory()->create();

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    expect(auth()->check())->toBeTrue();
    $response->assertRedirect(route('dashboard', absolute: false));
});

it('does not authenticate users with an invalid password', function () {
    $user = User::factory()->create();

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    expect(auth()->check())->toBeFalse();
});

it('logs out authenticated users', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/logout');

    expect(auth()->check())->toBeFalse();
    $response->assertRedirect('/');
});
