<?php

namespace RRZE\FormWizard\Common\Settings;

defined('ABSPATH') || exit;

$flash = $settings->flash->has();
$errors = $settings->errors->hasErrors();
?>
<div class="wrap rrze-formwizard-settings-wrap">
    <h1 class="wp-heading-inline"><?php echo esc_html($settings->title); ?></h1>
    <button type="button" id="rrze-formwizard-start-guided-tour" class="page-title-action">
        <?php esc_html_e('Guided tour', 'rrze-formwizard'); ?>
    </button>
    <button type="button" id="rrze-formwizard-start-setup-tour" class="page-title-action">
        <?php esc_html_e('Setup tour', 'rrze-formwizard'); ?>
    </button>
    <hr class="wp-header-end">
    <div id="rrze-formwizard-guided-tour-root"></div>

    <?php if ($flash) { ?>
        <div class="notice notice-<?php echo $flash['status']; ?> is-dismissible">
            <p><?php echo $flash['message']; ?></p>
        </div>
    <?php } ?>

    <?php if ($errors) { ?>
        <div class="notice notice-error is-dismissible">
            <p><?php _e('Settings issues detected.', 'rrze-formwizard'); ?></p>
        </div>
    <?php } ?>

    <?php $settings->renderTabMenu(); ?>

    <?php $settings->renderActiveSections(); ?>
</div>