Feature: Colors
  Scenario: 
    When I visit "/"
    And the window size is "1024x1480"

    Then save reference png of 'body' as 'iris.png'

    # Then save png of '[role="banner"]' as 'results/[Page]/header.png'
    # And compare image 'results/[Page]/header.png' to 'css/reference/[Page]/header.png'

    # Then save png of '[role="contentinfo"]' as 'results/[Page]/footer.png'
    # And compare image 'results/[Page]/footer.png' to 'css/reference/[Page]/footer.png'

    # Then save png of 'body' as 'results/[Page]/body.png'
    # And compare image 'results/[Page]/body.png' to 'css/reference/[Page]/body.png'
