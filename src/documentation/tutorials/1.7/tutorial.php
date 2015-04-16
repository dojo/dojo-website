<?php
if (isset($_GET['tutorial'])) {
        $tutorial_name = preg_replace('/\W/','',trim($_GET['tutorial']));
        if (is_dir($tutorial_name)) {
                chdir($tutorial_name);
                $meta = json_decode(file_get_contents('meta.json'),true);
                if (isset($meta['available']) && $meta['available']) {
			require 'resources/Utils.php';
                        require 'includes/config.inc';
                        extract($meta, EXTR_OVERWRITE);
                        setPageTitle($title);
                        require 'resources/template.inc';
                } else {
                        // Tutorial not available
                }
        } else {
                // Invalid tutorial request
        }
} else {
        // Offer main tutorial page
}

