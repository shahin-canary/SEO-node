import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the SEO, Accessibility, and Performance Audit API!");
});

// Endpoint to audit a URL
app.post("/audit", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: true });
    const port = new URL(browser.wsEndpoint()).port;

    // Run Lighthouse
    const result = await lighthouse(url, {
      currentTime : new Date().getTime(),
      
      port,
      output: "json",
      logLevel: "info",
    });

    const report = JSON.parse(result.report);
    await browser.close();

    // Respond with audit results
    res.json({
      performance: report.categories.performance.score,
      accessibility: report.categories.accessibility.score,
      best_practices: report.categories["best-practices"].score,
      seo: report.categories.seo.score,

      largest_contentful_paint: report.audits["largest-contentful-paint"].displayValue,
      first_contentful_paint: report.audits["first-contentful-paint"].displayValue,
      first_contentful_paint_score: report.audits["first-contentful-paint"].score, 
      cumulative_layout_shift: report.audits["cumulative-layout-shift"].displayValue,
      cumulative_layout_shift_score: report.audits["cumulative-layout-shift"].score, 
      total_blocking_time: report.audits["total-blocking-time"].displayValue,
      max_potential_fid: report.audits["max-potential-fid"].displayValue,
      max_potential_fid_score: report.audits["max-potential-fid"].score, 
      speed_index: report.audits["speed-index"].displayValue,
      first_meaningful_paint: report.audits["first-meaningful-paint"].displayValue,
      interactive: report.audits.interactive.displayValue,
      largest_contentful_paint_element: report.audits["largest-contentful-paint-element"].displayValue,
 
      requested_url: report.requestedUrl,
      main_document_url: report.mainDocumentUrl,
      final_displayed_url: report.finalDisplayedUrl,
      final_url: report.finalUrl,
      fetch_time: report.fetchTime,
      gather_mode: report.gatherMode,
      run_warnings: report.runWarnings,
      user_agent: report.userAgent,
      network_user_agent: report.environment.networkUserAgent,
      host_user_agent: report.environment.hostUserAgent,
      benchmark_index: report.environment.benchmarkIndex,
 
      audits: report.audits["is-on-https"].score,  
      redirects_http: report.audits["redirects-http"],
      screenshot_thumbnails: report.audits["screenshot-thumbnails"].score,
      final_screenshot: report.audits["final-screenshot"].score,
      errors_in_console: report.audits["errors-in-console"].score,
      errors_in_console_details: report.audits["errors-in-console"].details.items,
      server_response_time: report.audits["server-response-time"].score,
      server_response_time: report.audits["server-response-time"].details.items.responseTime,
      server_response_time_display_value: report.audits["server-response-time"].displayValue,
      server_response_time_details: report.audits["server-response-time"].details.items.responseTime,
      interactive: report.audits["interactive"].score,
      interactive_display_value: report.audits["interactive"].displayValue,
      user_timings: report.audits["user-timings"].score,
      user_timings_display_mode: report.audits["user-timings"].scoreDisplayMode,
      critical_request_chains: report.audits["critical-request-chains"].score,
      critical_request_chains_display_value: report.audits["critical-request-chains"].displayValue, 
      redirects_numeric_value: report.audits["redirects"].score,
      redirects_display_value: report.audits["redirects"].displayValue,
      image_aspect_ratio: report.audits["image-aspect-ratio"].score, 
      image_size_responsive: report.audits["image-size-responsive"].score, 
      deprecations: report.audits["deprecations"].score, 
      third_party_cookies: report.audits["third-party-cookies"].score, 
      mainthread_work_breakdown: report.audits["mainthread-work-breakdown"].score,
      mainthread_work_breakdown: report.audits["mainthread-work-breakdown"].displayValue,

      notification_on_start: report.audits["notification-on-start"].score,
      notification_on_start_display_mode: report.audits["notification-on-start"].scoreDisplayMode,
      paste_preventing_inputs: report.audits["paste-preventing-inputs"].score,
      paste_preventing_inputs_display_mode: report.audits["paste-preventing-inputs"].scoreDisplayMode,
      uses_http2: report.audits["uses-http2"].score,
      uses_http2_display_mode: report.audits["uses-http2"].scoreDisplayMode,
      uses_passive_event_listeners: report.audits["uses-passive-event-listeners"].score,
      uses_passive_event_listeners_display_mode: report.audits["uses-passive-event-listeners"].scoreDisplayMode,
      meta_description: report.audits["meta-description"].score,
      meta_description_display_mode: report.audits["meta-description"].scoreDisplayMode,
      http_status_code: report.audits["http-status-code"].score,
      http_status_code_display_mode: report.audits["http-status-code"].scoreDisplayMode,
      font_size: report.audits["font-size"].score,
      font_size_display_value: report.audits["font-size"].displayValue,
      link_text: report.audits["link-text"].score,
      link_text_display_value: report.audits["link-text"].displayValue,
      crawlable_anchors: report.audits["crawlable-anchors"].score,
      is_crawlable: report.audits["is-crawlable"].score,
      robots_txt: report.audits["robots-txt"].score,
      hreflang: report.audits["hreflang"].score,
      canonical: report.audits["canonical"].score,
      structured_data: report.audits["structured-data"].score,
      bf_cache: report.audits["bf-cache"].score, 
      config_settings: report.configSettings,
      total: report.total,

      notification_on_start: report.audits["notification-on-start"].score,
      paste_preventing_inputs: report.audits["paste-preventing-inputs"].score,
      uses_http2: report.audits["uses-http2"].score,
      uses_passive_event_listeners: report.audits["uses-passive-event-listeners"].score,
      meta_description: report.audits["meta-description"].score,
      http_status_code: report.audits["http-status-code"].score,
      font_size: report.audits["font-size"].displayValue,
      link_text: report.audits["link-text"].displayValue,
      crawlable_anchors: report.audits["crawlable-anchors"].score,
      is_crawlable: report.audits["is-crawlable"].score,
      robots_txt: report.audits["robots-txt"].score,
      hreflang: report.audits["hreflang"].score,
      canonical: report.audits["canonical"].score,
      structured_data: report.audits["structured-data"].score,
      bf_cache: report.audits["bf-cache"].score,
      network_requests: report.audits["network-requests"].score,
      network_server_latency: report.audits["network-server-latency"].score,
      main_thread_tasks: report.audits["main-thread-tasks"].score,
      resource_summary: report.audits["resource-summary"].score,
      third_party_summary: report.audits["third-party-summary"].score,
      largest_contentful_paint_element: report.audits["largest-contentful-paint-element"].displayValue,
      unsized_images: report.audits["unsized-images"].score,
      valid_source_maps: report.audits["valid-source-maps"].score,
      aria_allowed_attr: report.audits["aria-allowed-attr"].score,
      aria_valid_attr: report.audits["aria-valid-attr"].score,
      color_contrast: report.audits["color-contrast"].score,
      document_title: report.audits["document-title"].score,
      html_has_lang: report.audits["html-has-lang"].score,
      html_lang_valid: report.audits["html-lang-valid"].score,
      image_alt: report.audits["image-alt"].score,
      image_redundant_alt: report.audits["image-redundant-alt"].score,
      meta_viewport: report.audits["meta-viewport"].score,
      target_size: report.audits["target-size"].score,
      total_byte_weight: report.audits["total-byte-weight"].displayValue,
      offscreen_images: report.audits["offscreen-images"].displayValue,
      render_blocking_resources: report.audits["render-blocking-resources"].displayValue,
      unused_css_rules: report.audits["unused-css-rules"].displayValue,
      unused_javascript: report.audits["unused-javascript"].displayValue,
      modern_image_formats: report.audits["modern-image-formats"].score,
      uses_optimized_images: report.audits["uses-optimized-images"].score,
      uses_text_compression: report.audits["uses-text-compression"].score,
      uses_responsive_images: report.audits["uses-responsive-images"].score,
      efficient_animated_content: report.audits["efficient-animated-content"].displayValue,
      legacy_javascript: report.audits["legacy-javascript"].displayValue,
      charset: report.audits["charset"].score,
      dom_size: report.audits["dom-size"].displayValue,
      geolocation_on_start: report.audits["geolocation-on-start"].score,
      inspector_issues: report.audits["inspector-issues"].score,
      no_document_write: report.audits["no-document-write"].score,
      js_libraries: report.audits["js-libraries"].score,
 
      metrics_title: report.categoryGroups.metrics.title,
      diagnostics_title: report.categoryGroups.diagnostics.title,
      diagnostics_description: report.categoryGroups.diagnostics.description,
      a11y_best_practices_title: report.categoryGroups["a11y-best-practices"].title,
      a11y_best_practices_description: report.categoryGroups["a11y-best-practices"].description,
      a11y_color_contrast_title: report.categoryGroups["a11y-color-contrast"].title,
      a11y_color_contrast_description: report.categoryGroups["a11y-color-contrast"].description,
      a11y_names_labels_title: report.categoryGroups["a11y-names-labels"].title,
      a11y_names_labels_description: report.categoryGroups["a11y-names-labels"].description,
      a11y_navigation_title: report.categoryGroups["a11y-navigation"].title,
      a11y_navigation_description: report.categoryGroups["a11y-navigation"].description,
      a11y_aria_title: report.categoryGroups["a11y-aria"].title,
      a11y_aria_description: report.categoryGroups["a11y-aria"].description,
      a11y_language_title: report.categoryGroups["a11y-language"].title,
      a11y_language_description: report.categoryGroups["a11y-language"].description,
      a11y_audio_video_title: report.categoryGroups["a11y-audio-video"].title,
      a11y_audio_video_description: report.categoryGroups["a11y-audio-video"].description,
      a11y_tables_lists_title: report.categoryGroups["a11y-tables-lists"].title,
      a11y_tables_lists_description: report.categoryGroups["a11y-tables-lists"].description,
      seo_mobile_title: report.categoryGroups["seo-mobile"].title,
      seo_mobile_description: report.categoryGroups["seo-mobile"].description,
      seo_content_title: report.categoryGroups["seo-content"].title,
      seo_content_description: report.categoryGroups["seo-content"].description,
      seo_crawl_title: report.categoryGroups["seo-crawl"].title,
      seo_crawl_description: report.categoryGroups["seo-crawl"].description,
      best_practices_trust_safety_title: report.categoryGroups["best-practices-trust-safety"].title,
      best_practices_ux_title: report.categoryGroups["best-practices-ux"].title,
      best_practices_browser_compat_title: report.categoryGroups["best-practices-browser-compat"].title,
      best_practices_general_title: report.categoryGroups["best-practices-general"].title,
      hidden_title: report.categoryGroups.hidden.title,
 
      // wordpress_title: report.stackPacks[0].title,
      // wordpress_iconDataURL: report.stackPacks[0].iconDataURL,
      // wordpress_descriptions_unused_css_rules: report.stackPacks[0].descriptions["unused-css-rules"],
      // wordpress_descriptions_modern_image_formats: report.stackPacks[0].descriptions["modern-image-formats"],
      // wordpress_descriptions_offscreen_images: report.stackPacks[0].descriptions["offscreen-images"],
      // wordpress_descriptions_total_byte_weight: report.stackPacks[0].descriptions["total-byte-weight"],
      // wordpress_descriptions_render_blocking_resources: report.stackPacks[0].descriptions["render-blocking-resources"],
      // wordpress_descriptions_unminified_css: report.stackPacks[0].descriptions["unminified-css"],
      // wordpress_descriptions_unminified_javascript: report.stackPacks[0].descriptions["unminified-javascript"],
      // wordpress_descriptions_efficient_animated_content: report.stackPacks[0].descriptions["efficient-animated-content"],
      // wordpress_descriptions_unused_javascript: report.stackPacks[0].descriptions["unused-javascript"],
      // wordpress_descriptions_uses_long_cache_ttl: report.stackPacks[0].descriptions["uses-long-cache-ttl"],
      // wordpress_descriptions_uses_optimized_images: report.stackPacks[0].descriptions["uses-optimized-images"],
      // wordpress_descriptions_uses_text_compression: report.stackPacks[0].descriptions["uses-text-compression"],
      // wordpress_descriptions_uses_responsive_images: report.stackPacks[0].descriptions["uses-responsive-images"],
      // wordpress_descriptions_server_response_time: report.stackPacks[0].descriptions["server-response-time"]
  
      
      // detailedReport: report,
    });
  } catch (error) {
    console.error("Audit failed:", error);
    res.status(500).json({ error: "Failed to audit the URL" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
