<?php
/**
 * DemoPlugin
 *
 * @copyright Copyright(c) 2017, Rheinard Korf
 * @licence http://opensource.org/licenses/GPL-2.0 GNU General Public License, version 2 (GPL-2.0)
 *
 * Plugin Name: Demo Plugin
 * Plugin URI: https://github.com/rheinardkorf
 * Description: Webpack build demo. Note PHP5.3+ required.
 * Version: 0.1-alpha
 * Author: Rheinard Korf
 * Author URI: https://github.com/rheinardkorf
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: demo-plugin
 * Domain Path: /languages
 */

/**
 * Add something for JavaScript to manipulate.
 */
add_filter( 'the_content', function( $content ) {

	$content = '<div id="demo-plugin-item"></div>' . $content;
	return $content;
} );

/**
 * Enqueue assets.
 */
add_action( 'wp_enqueue_scripts', function() {

	wp_enqueue_style( 'demo-plugin', plugin_dir_url( __FILE__ ) . 'css/style.css' );
	wp_enqueue_script( 'demo-plugin', plugin_dir_url( __FILE__ ) . 'js/scripts.js', array(), false, true );
} );
