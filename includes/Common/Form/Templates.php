<?php

namespace RRZE\FormWizard\Common\Form;

defined('ABSPATH') || exit;

class Templates
{
    public static function all(): array
    {
        $templates = [
            'blank' => [
                'label' => __('Blank form', 'rrze-formwizard'),
                'formTitle' => '',
                'formDescription' => '',
                'fields' => [],
            ],
            'contact' => [
                'label' => __('Contact form', 'rrze-formwizard'),
                'formTitle' => __('Contact', 'rrze-formwizard'),
                'formDescription' => __('Send us a message.', 'rrze-formwizard'),
                'fields' => [
                    [
                        'id' => 'name',
                        'type' => 'text',
                        'label' => __('Name', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                    ],
                    [
                        'id' => 'email',
                        'type' => 'email',
                        'label' => __('E-mail address', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                    ],
                    [
                        'id' => 'subject',
                        'type' => 'text',
                        'label' => __('Subject', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                    ],
                    [
                        'id' => 'message',
                        'type' => 'textarea',
                        'label' => __('Message', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                    ],
                ],
            ],
            'feedback' => [
                'label' => __('Feedback form', 'rrze-formwizard'),
                'formTitle' => __('Feedback', 'rrze-formwizard'),
                'formDescription' => __('We appreciate your feedback.', 'rrze-formwizard'),
                'fields' => [
                    [
                        'id' => 'rating',
                        'type' => 'select',
                        'label' => __('Overall rating', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                        'options' => [
                            ['value' => '5', 'label' => __('Excellent', 'rrze-formwizard')],
                            ['value' => '4', 'label' => __('Good', 'rrze-formwizard')],
                            ['value' => '3', 'label' => __('Average', 'rrze-formwizard')],
                            ['value' => '2', 'label' => __('Poor', 'rrze-formwizard')],
                            ['value' => '1', 'label' => __('Very poor', 'rrze-formwizard')],
                        ],
                    ],
                    [
                        'id' => 'comment',
                        'type' => 'textarea',
                        'label' => __('Your feedback', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                    ],
                ],
            ],
            'event' => [
                'label' => __('Event registration', 'rrze-formwizard'),
                'formTitle' => __('Event registration', 'rrze-formwizard'),
                'formDescription' => __('Register for the event.', 'rrze-formwizard'),
                'fields' => [
                    [
                        'id' => 'personal_heading',
                        'type' => 'heading',
                        'label' => __('Personal details', 'rrze-formwizard'),
                        'step' => 1,
                    ],
                    [
                        'id' => 'firstname',
                        'type' => 'text',
                        'label' => __('First name', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                    ],
                    [
                        'id' => 'lastname',
                        'type' => 'text',
                        'label' => __('Last name', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                    ],
                    [
                        'id' => 'email',
                        'type' => 'email',
                        'label' => __('E-mail address', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                    ],
                    [
                        'id' => 'event_heading',
                        'type' => 'heading',
                        'label' => __('Event details', 'rrze-formwizard'),
                        'step' => 2,
                    ],
                    [
                        'id' => 'attendance',
                        'type' => 'radio',
                        'label' => __('Participation', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 2,
                        'options' => [
                            ['value' => 'in_person', 'label' => __('In person', 'rrze-formwizard')],
                            ['value' => 'online', 'label' => __('Online', 'rrze-formwizard')],
                        ],
                    ],
                    [
                        'id' => 'diet',
                        'type' => 'select',
                        'label' => __('Dietary requirements', 'rrze-formwizard'),
                        'required' => false,
                        'step' => 2,
                        'options' => [
                            ['value' => 'none', 'label' => __('None', 'rrze-formwizard')],
                            ['value' => 'vegetarian', 'label' => __('Vegetarian', 'rrze-formwizard')],
                            ['value' => 'vegan', 'label' => __('Vegan', 'rrze-formwizard')],
                        ],
                    ],
                ],
            ],
            'support' => [
                'label' => __('Support request', 'rrze-formwizard'),
                'formTitle' => __('Support request', 'rrze-formwizard'),
                'formDescription' => __('Describe your issue and we will get back to you.', 'rrze-formwizard'),
                'fields' => [
                    [
                        'id' => 'name',
                        'type' => 'text',
                        'label' => __('Name', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                    ],
                    [
                        'id' => 'email',
                        'type' => 'email',
                        'label' => __('E-mail address', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                    ],
                    [
                        'id' => 'category',
                        'type' => 'select',
                        'label' => __('Category', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                        'options' => [
                            ['value' => 'technical', 'label' => __('Technical issue', 'rrze-formwizard')],
                            ['value' => 'content', 'label' => __('Content issue', 'rrze-formwizard')],
                            ['value' => 'other', 'label' => __('Other', 'rrze-formwizard')],
                        ],
                    ],
                    [
                        'id' => 'description',
                        'type' => 'textarea',
                        'label' => __('Description', 'rrze-formwizard'),
                        'required' => true,
                        'step' => 1,
                    ],
                ],
            ],
        ];

        return apply_filters('rrze_formwizard_templates', $templates);
    }

    public static function get(string $key): ?array
    {
        $all = self::all();
        return $all[$key] ?? null;
    }
}
