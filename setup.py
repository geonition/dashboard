from setuptools import setup
from setuptools import find_packages

setup(
    name='dashboard',
    version='4.0.2',
    author='Kristoffer Snabb',
    url='https://github.com/geonition/dashboard',
    packages=find_packages(),
    include_package_data=True,
    package_data = {
    "dashboard": [
        "templates/*",
        "static/styles/*",
        "static/img/*",
        "static/json/*",
        "locale/fi/LC_MESSAGES/*",
        "locale/sv/LC_MESSAGES/*"
        ]
        },
    zip_safe=False,
    install_requires=[
       'django'
    ]
)
