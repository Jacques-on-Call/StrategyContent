from playwright.sync_api import sync_playwright
import os

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(f"file://{os.getcwd()}/index.html")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="jules-scratch/verification/index.png")
        browser.close()

if __name__ == "__main__":
    main()
