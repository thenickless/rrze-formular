import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

const FIELD_TYPES = [
	{ label: __('Text', 'rrze-formwizard'), value: 'text' },
	{ label: __('E-mail', 'rrze-formwizard'), value: 'email' },
	{ label: __('Telephone', 'rrze-formwizard'), value: 'tel' },
	{ label: __('Number', 'rrze-formwizard'), value: 'number' },
	{ label: __('Textarea', 'rrze-formwizard'), value: 'textarea' },
	{ label: __('Select', 'rrze-formwizard'), value: 'select' },
	{ label: __('Radio', 'rrze-formwizard'), value: 'radio' },
	{ label: __('Checkbox', 'rrze-formwizard'), value: 'checkbox' },
	{ label: __('Section heading', 'rrze-formwizard'), value: 'heading' },
];

const TEMPLATES = [
	{ label: __('Blank form', 'rrze-formwizard'), value: 'blank', fields: [], formTitle: '', formDescription: '' },
	{
		label: __('Contact form', 'rrze-formwizard'),
		value: 'contact',
		formTitle: __('Contact', 'rrze-formwizard'),
		formDescription: __('Send us a message.', 'rrze-formwizard'),
		fields: [
			{ id: 'name', type: 'text', label: __('Name', 'rrze-formwizard'), required: true, step: 1, options: [] },
			{ id: 'email', type: 'email', label: __('E-mail address', 'rrze-formwizard'), required: true, step: 1, options: [] },
			{ id: 'subject', type: 'text', label: __('Subject', 'rrze-formwizard'), required: true, step: 1, options: [] },
			{ id: 'message', type: 'textarea', label: __('Message', 'rrze-formwizard'), required: true, step: 1, options: [] },
		],
	},
	{
		label: __('Feedback form', 'rrze-formwizard'),
		value: 'feedback',
		formTitle: __('Feedback', 'rrze-formwizard'),
		formDescription: __('We appreciate your feedback.', 'rrze-formwizard'),
		fields: [
			{
				id: 'rating',
				type: 'select',
				label: __('Overall rating', 'rrze-formwizard'),
				required: true,
				step: 1,
				options: [
					{ value: '5', label: __('Excellent', 'rrze-formwizard') },
					{ value: '4', label: __('Good', 'rrze-formwizard') },
					{ value: '3', label: __('Average', 'rrze-formwizard') },
					{ value: '2', label: __('Poor', 'rrze-formwizard') },
					{ value: '1', label: __('Very poor', 'rrze-formwizard') },
				],
			},
			{ id: 'comment', type: 'textarea', label: __('Your feedback', 'rrze-formwizard'), required: true, step: 1, options: [] },
		],
	},
	{
		label: __('Event registration', 'rrze-formwizard'),
		value: 'event',
		formTitle: __('Event registration', 'rrze-formwizard'),
		formDescription: __('Register for the event.', 'rrze-formwizard'),
		fields: [
			{ id: 'personal_heading', type: 'heading', label: __('Personal details', 'rrze-formwizard'), required: false, step: 1, options: [] },
			{ id: 'firstname', type: 'text', label: __('First name', 'rrze-formwizard'), required: true, step: 1, options: [] },
			{ id: 'lastname', type: 'text', label: __('Last name', 'rrze-formwizard'), required: true, step: 1, options: [] },
			{ id: 'email', type: 'email', label: __('E-mail address', 'rrze-formwizard'), required: true, step: 1, options: [] },
			{ id: 'event_heading', type: 'heading', label: __('Event details', 'rrze-formwizard'), required: false, step: 2, options: [] },
			{
				id: 'attendance',
				type: 'radio',
				label: __('Participation', 'rrze-formwizard'),
				required: true,
				step: 2,
				options: [
					{ value: 'in_person', label: __('In person', 'rrze-formwizard') },
					{ value: 'online', label: __('Online', 'rrze-formwizard') },
				],
			},
			{
				id: 'diet',
				type: 'select',
				label: __('Dietary requirements', 'rrze-formwizard'),
				required: false,
				step: 2,
				options: [
					{ value: 'none', label: __('None', 'rrze-formwizard') },
					{ value: 'vegetarian', label: __('Vegetarian', 'rrze-formwizard') },
					{ value: 'vegan', label: __('Vegan', 'rrze-formwizard') },
				],
			},
		],
	},
	{
		label: __('Support request', 'rrze-formwizard'),
		value: 'support',
		formTitle: __('Support request', 'rrze-formwizard'),
		formDescription: __('Describe your issue and we will get back to you.', 'rrze-formwizard'),
		fields: [
			{ id: 'name', type: 'text', label: __('Name', 'rrze-formwizard'), required: true, step: 1, options: [] },
			{ id: 'email', type: 'email', label: __('E-mail address', 'rrze-formwizard'), required: true, step: 1, options: [] },
			{
				id: 'category',
				type: 'select',
				label: __('Category', 'rrze-formwizard'),
				required: true,
				step: 1,
				options: [
					{ value: 'technical', label: __('Technical issue', 'rrze-formwizard') },
					{ value: 'content', label: __('Content issue', 'rrze-formwizard') },
					{ value: 'other', label: __('Other', 'rrze-formwizard') },
				],
			},
			{ id: 'description', type: 'textarea', label: __('Description', 'rrze-formwizard'), required: true, step: 1, options: [] },
		],
	},
];

function cloneFields(fields) {
	return fields.map((field, index) => ({
		...field,
		id: field.id || `field_${index + 1}`,
		options: Array.isArray(field.options) ? field.options.map((option) => ({ ...option })) : [],
	}));
}

function createField(type = 'text') {
	return {
		id: `field_${Date.now()}`,
		type,
		label: __('New field', 'rrze-formwizard'),
		placeholder: '',
		required: false,
		step: 1,
		options: ['select', 'radio'].includes(type)
			? [{ value: 'option_1', label: __('Option 1', 'rrze-formwizard') }]
			: [],
	};
}

function moveField(fields, index, direction) {
	const nextIndex = index + direction;
	if (nextIndex < 0 || nextIndex >= fields.length) {
		return fields;
	}
	const next = [...fields];
	const [item] = next.splice(index, 1);
	next.splice(nextIndex, 0, item);
	return next;
}

function FieldEditor({ field, index, total, onChange, onRemove, onMove }) {
	const hasOptions = field.type === 'select' || field.type === 'radio';

	return (
		<div className="rrze-formwizard-field-editor">
			<strong>{__('Field', 'rrze-formwizard')} {index + 1}</strong>
			<SelectControl
				label={__('Type', 'rrze-formwizard')}
				value={field.type}
				options={FIELD_TYPES}
				onChange={(value) => onChange(index, {
					...field,
					type: value,
					options: ['select', 'radio'].includes(value) && (!field.options || field.options.length === 0)
						? [{ value: 'option_1', label: __('Option 1', 'rrze-formwizard') }]
						: field.options,
				})}
			/>
			<TextControl
				label={__('Label', 'rrze-formwizard')}
				value={field.label}
				onChange={(value) => onChange(index, { ...field, label: value })}
			/>
			{field.type !== 'heading' && (
				<TextControl
					label={__('Placeholder', 'rrze-formwizard')}
					value={field.placeholder || ''}
					onChange={(value) => onChange(index, { ...field, placeholder: value })}
				/>
			)}
			<TextControl
				label={__('Step', 'rrze-formwizard')}
				type="number"
				min="1"
				value={String(field.step || 1)}
				onChange={(value) => onChange(index, { ...field, step: parseInt(value, 10) || 1 })}
			/>
			{field.type !== 'heading' && (
				<ToggleControl
					label={__('Required', 'rrze-formwizard')}
					checked={!!field.required}
					onChange={(value) => onChange(index, { ...field, required: value })}
				/>
			)}
			{hasOptions && field.options.map((option, optionIndex) => (
				<div key={`${field.id}-option-${optionIndex}`} className="rrze-formwizard-field-editor__option">
					<TextControl
						label={__('Option label', 'rrze-formwizard')}
						value={option.label}
						onChange={(value) => {
							const options = [...field.options];
							options[optionIndex] = { ...options[optionIndex], label: value };
							onChange(index, { ...field, options });
						}}
					/>
					<TextControl
						label={__('Option value', 'rrze-formwizard')}
						value={option.value}
						onChange={(value) => {
							const options = [...field.options];
							options[optionIndex] = { ...options[optionIndex], value };
							onChange(index, { ...field, options });
						}}
					/>
				</div>
			))}
			{hasOptions && (
				<Button
					variant="secondary"
					onClick={() => onChange(index, {
						...field,
						options: [
							...field.options,
							{ value: `option_${field.options.length + 1}`, label: __('New option', 'rrze-formwizard') },
						],
					})}
				>
					{__('Add option', 'rrze-formwizard')}
				</Button>
			)}
			<div className="rrze-formwizard-field-editor__actions">
				<Button disabled={index === 0} onClick={() => onMove(index, -1)}>{__('Move up', 'rrze-formwizard')}</Button>
				<Button disabled={index === total - 1} onClick={() => onMove(index, 1)}>{__('Move down', 'rrze-formwizard')}</Button>
				<Button isDestructive onClick={() => onRemove(index)}>{__('Remove', 'rrze-formwizard')}</Button>
			</div>
		</div>
	);
}

export default function Edit({ attributes, setAttributes }) {
	const {
		template,
		formTitle,
		formDescription,
		recipientEmail,
		submitLabel,
		successMessage,
		includeSsoInfo,
		sendConfirmation,
		fields,
	} = attributes;

	const blockProps = useBlockProps({ className: 'rrze-formwizard-block-editor' });

	useEffect(() => {
		if (fields && fields.length > 0) {
			return;
		}
		const selected = TEMPLATES.find((item) => item.value === template) || TEMPLATES[1];
		setAttributes({
			formTitle: selected.formTitle,
			formDescription: selected.formDescription,
			fields: cloneFields(selected.fields),
		});
	}, []);

	const applyTemplate = (value) => {
		const selected = TEMPLATES.find((item) => item.value === value) || TEMPLATES[0];
		setAttributes({
			template: value,
			formTitle: selected.formTitle,
			formDescription: selected.formDescription,
			fields: cloneFields(selected.fields),
		});
	};

	const updateField = (index, nextField) => {
		const nextFields = [...fields];
		nextFields[index] = nextField;
		setAttributes({ fields: nextFields });
	};

	const removeField = (index) => {
		setAttributes({ fields: fields.filter((_, fieldIndex) => fieldIndex !== index) });
	};

	const moveFieldAt = (index, direction) => {
		setAttributes({ fields: moveField(fields, index, direction) });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Template', 'rrze-formwizard')} initialOpen>
					<SelectControl
						label={__('Form template', 'rrze-formwizard')}
						value={template}
						options={TEMPLATES.map((item) => ({ label: item.label, value: item.value }))}
						onChange={applyTemplate}
					/>
				</PanelBody>
				<PanelBody title={__('Form settings', 'rrze-formwizard')} initialOpen={false}>
					<TextControl
						label={__('Title', 'rrze-formwizard')}
						value={formTitle}
						onChange={(value) => setAttributes({ formTitle: value })}
					/>
					<TextareaControl
						label={__('Description', 'rrze-formwizard')}
						value={formDescription}
						onChange={(value) => setAttributes({ formDescription: value })}
					/>
					<TextControl
						label={__('Recipient e-mail', 'rrze-formwizard')}
						help={__('Optional. Must use an allowed domain. Otherwise the default recipient is used.', 'rrze-formwizard')}
						value={recipientEmail}
						onChange={(value) => setAttributes({ recipientEmail: value })}
					/>
					<TextControl
						label={__('Submit button label', 'rrze-formwizard')}
						value={submitLabel}
						onChange={(value) => setAttributes({ submitLabel: value })}
					/>
					<TextControl
						label={__('Success message', 'rrze-formwizard')}
						value={successMessage}
						onChange={(value) => setAttributes({ successMessage: value })}
					/>
					<ToggleControl
						label={__('Include SSO / logged-in user data', 'rrze-formwizard')}
						checked={!!includeSsoInfo}
						onChange={(value) => setAttributes({ includeSsoInfo: value })}
					/>
					<ToggleControl
						label={__('Send confirmation to submitter', 'rrze-formwizard')}
						help={__('Only sent when the submitter e-mail uses an allowed confirmation domain.', 'rrze-formwizard')}
						checked={!!sendConfirmation}
						onChange={(value) => setAttributes({ sendConfirmation: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Fields', 'rrze-formwizard')} initialOpen>
					{(fields || []).map((field, index) => (
						<FieldEditor
							key={field.id || index}
							field={field}
							index={index}
							total={fields.length}
							onChange={updateField}
							onRemove={removeField}
							onMove={moveFieldAt}
						/>
					))}
					<Button variant="primary" onClick={() => setAttributes({ fields: [...fields, createField()] })}>
						{__('Add field', 'rrze-formwizard')}
					</Button>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<ServerSideRender block="rrze-formwizard/form-wizard" attributes={attributes} />
			</div>
		</>
	);
}
