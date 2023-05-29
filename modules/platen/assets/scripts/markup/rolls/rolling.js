let Roller = new rpgDiceRoller.DiceRoller();

function randomItem(collection) {
    return collection[Math.floor(Math.random() * collection.length)];
}

function resultReference(index) {
    return `result_${index}`
}

function escapeRegExp(string) {
    // $& means the whole matched string
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function getResultText(roll, result, template) {
    let pattern = /\{\{\s*(?<variable>(?:\w|\.)+)\s*\}\}/g
    let matches = template.matchAll(pattern)
    let resultText = template
    for (const match of matches) {
        let stringToReplace = match[0]
        let varName = match.groups.variable
        let replacementValue = result
        if (varName == 'roll') {
            replacementValue = `${roll}`
        } else {
            varName.split('.').forEach(function (dotSegment) {
                replacementValue = replacementValue[dotSegment]
            })
        }

        resultText = resultText.replace(stringToReplace, replacementValue)
    }

    return resultText
}

function rollNotation(data, container, notation) {
    let rolls          = []
    let prompts        = container.querySelectorAll('sl-input')
    let mungedNotation = notation

    if (prompts.length > 0) {
        prompts.forEach(prompt => {
            mungedNotation = mungedNotation.replace(`{{ ${prompt.name} }}`, `${prompt.value}`)
        })
    }

    mungedNotation.split(',').forEach(function (statement) {
        let roll = Roller.roll(statement)
        rolls.push(roll.total)
    })

    return rolls
}

function rollInline(data, refs, id) {
    let container = refs[id]
    let result = rollNotation(data, container, data.roll)
    
    console.log(result)
    data.result = result

    let result_sum = 0
    result.forEach(r => result_sum += r)

    if (data.result_text_template != '') {
        let text = data.result_text_template.replace('{{ result }}', result)
        text = text.replace('{{ result.sum }}', result_sum )
        data.result_text = text
    } else {
        data.result_text = result_sum
    }
}

function sortResultsInfo(results) {
    let sorted = []
    results.forEach(result => {
        let sortKey = getSortableInfo(result._roll)
        let sortable = JSON.parse(`{"${sortKey}": ${JSON.stringify(result)}}`)
        result.sortable = sortKey
        sorted.push(result)
    })

    sorted.sort((a, b) => {
        if (a.sortable > b.sortable) {
            return 1
        }
        if (a.sortable < b.sortable) {
            return -1
        }
        return 0
    })

    return sorted
}

function getSortableInfo(info) {
    let min = undefined
    let max = undefined

    if (info.hasOwnProperty('Value')) {
        if (Array.isArray(info.Value)) {
            let munged = []
            info.Value.forEach(value => {
                munged.push(String(value).padStart(4, '0'))
            })
            munged = munged.join('')
            min = munged
            max = munged
            return [min, max]
        } else {
            munged = String(info.Value).padStart(4,'0')
            min = munged
            max = munged
            return [min, max]
        }
    }

    if (info.hasOwnProperty('Minimum')) {
        min = String(info.Minimum).padStart(4, '0')
    }
    if (info.hasOwnProperty('ExclusiveMinimum')) {
        min = String(info.ExclusiveMinimum + 1).padStart(4, '0')
    }
    if (info.hasOwnProperty('Maximum')) {
        max = String(info.Maximum).padStart(4, '0')
    }
    if (info.hasOwnProperty('ExclusiveMaximum')) {
        max = String(info.ExclusiveMaximum - 1).padStart(4, '0')
    }

    return [min, max]
}

function rollOn(data, refs, id) {
    let container = refs[id]
    let entries   = container.querySelectorAll('[data-roll]')

    let result = rollNotation(data, container, data.roll)
    let entry  = getRolledItem(result, entries)

    entries.forEach(entry => {
        entry.dataset.active = false
    })

    entry.dataset.active = true
    entry.focus = true

    if (data?.tabs?.length > 0) {
        let tabs   = container.querySelectorAll('sl-tab')
        let panels = container.querySelectorAll('sl-tab-panel')
        
        panels.forEach(panel => {
            panel.active = false
        })
        let panel = entry.closest('sl-tab-panel')

        tabs.forEach(tab => {
            tab.active = (tab.name == panel.name)
        })

        panel.active = true
    }

    let entryDisplay    = JSON.parse(entry.dataset.roll).Display
    let dataResultIndex = Object.keys(data.results).find(index => {
        dataDisplay = data.results[index]._roll.Display
        return dataDisplay == entryDisplay
    })
    let dataResult = data.results[dataResultIndex]

    let displayResult = result

    if (data.result_text_template != '') {
        let resultText = getResultText(
            displayResult,
            dataResult,
            data.result_text_template
        )
        data.result_text = resultText
    }

    if (data.prompts.length > 0) {
        container.querySelector('sl-dialog').hide()
    }
}

function getRolledItem(roll, entries) {
    // implies a d33, d66, d666, etc
    rollIsArray = Array.isArray(roll)
    // Loop over each entry til we find a match.
    for (const entry of entries) {
        // Parse the entry's data
        info = JSON.parse(entry.dataset.roll)
        // Retrieve the list of conditions that makes this entry a possible match.
        conditions = Object.keys(info)

        // Handle multi-dimensional results, like 3-2 on a d66
        if (rollIsArray && Array.isArray(info.Value)) {
            let isRolledEntry = true
            for (die in roll) {
                if (roll[die] != info.Value[die]) {
                    isRolledEntry = false
                    break
                }
            }
            if (isRolledEntry) {
                return entry
            }
        }

        // Handle single-dimensional results, like 4 on a d20
        if (conditions.includes('Value')) {
            if (roll == info.Value) {
                return entry
            }
            continue
        }

        // If we couldn't do an exact match, we need to do a conditional on the minimum/maximums
        // Start with the entry being valid and go through applicable checks, marking it invalid
        // if any check fails.
        let isValid = true
        if (conditions.includes('Minimum') && roll < info.Minimum) {
            isValid = false
        }
        if (conditions.includes('ExclusiveMinimum') && roll <= info.ExclusiveMinimum) {
            isValid = false
        }
        if (conditions.includes('Maximum') && roll > info.Maximum) {
            isValid = false
        }
        if (conditions.includes('ExclusiveMaximum') && roll >= info.ExclusiveMaximum) {
            isValid = false
        }
        if (isValid) {
            return entry
        }
    }
}

function decodeHTML(input) {
    var e = document.createElement('textarea');
    e.innerHTML = input;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function filterResults(results, validResults) {
    let valid = []

    results.forEach(result => {
        if (validResults.includes(result._roll.Display)) {
            valid.push(result)
        }
    })

    return valid
}

function showPrompts(data, refs, id) {
    let dialog = refs[id].querySelector('sl-dialog')
    dialog.querySelectorAll('sl-input').forEach(input => input.setAttribute('value', ''))
    dialog.show()
}

function definePrompt(element, prompt) {
    for (const key of Object.keys(prompt)) {
        element.setAttribute(key, prompt[key])
    }
}
