import React from 'react';

export interface StatCardProps {
    title: string;
    value: string | number;
    hint?: string;
}

export type BadgeTone = 'success' | 'warn' | 'danger' | 'neutral';

export interface BadgeProps {
    children: React.ReactNode;
    tone?: BadgeTone;
}

export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'ghost' | 'danger';
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

export interface TextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string | null;
}